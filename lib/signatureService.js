// Simulated e-signature service. Manages signature requests and signed
// document attachments in localStorage so the full Approved → Awaiting
// Signature → Signed flow can be demonstrated end-to-end.

import { logAuditEvent, recordGeneratedDoc } from "./auditTrail";
import { getRequest, setRequestStatus, upsertRequest } from "./requestStore";
import { getTemplateById } from "./templates";
import { buildPlaceholderValues } from "./placeholders";
import { generatePdf } from "./documentGenerator";

const SIG_KEY = "clm.signatures.v1";

function read() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SIG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function write(list) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SIG_KEY, JSON.stringify(list));
  } catch {}
}

function newToken() {
  return (
    "sig-" +
    Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 6)
  );
}

async function serverUpsert(entry) {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/signatures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "upsert", token: entry.token, entry }),
    });
  } catch {}
}

async function serverPatch(token, patch) {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/signatures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "patch", token, patch }),
    });
  } catch {}
}

export async function fetchServerSignature(token) {
  if (typeof window === "undefined") return null;
  try {
    const r = await fetch(`/api/signatures?token=${encodeURIComponent(token)}`, {
      cache: "no-store",
    });
    if (!r.ok) return null;
    const data = await r.json();
    return data?.signature || null;
  } catch {
    return null;
  }
}

/**
 * Returns the canonical signing URL for a token.
 * Prefers NEXT_PUBLIC_APP_URL (publicly reachable origin used in emails),
 * falling back to window.location.origin for local dev.
 */
export function signingUrl(token) {
  const base =
    (typeof process !== "undefined" &&
      process.env &&
      process.env.NEXT_PUBLIC_APP_URL) ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const clean = (base || "").replace(/\/+$/, "");
  return `${clean}/sign/${token}`;
}

/**
 * Initiate an e-signature request for a record.
 * - Validates the record + counterparty email
 * - Creates a signature request (status: "sent")
 * - Flips the NDA status to "Awaiting Signature"
 * - Calls the /api/send-signature-email endpoint to deliver the link by email
 * - Logs an audit entry and returns { token, url, email, emailDelivered }
 */
export async function sendForSignature(recordId, opts = {}) {
  const rec = getRequest(recordId);
  if (!rec) {
    return { ok: false, error: `Record ${recordId} not found.` };
  }
  const email =
    opts.email ||
    rec.form?.counterpartyEmail ||
    "";
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return {
      ok: false,
      error:
        "Counterparty email is missing or invalid. Add a valid email under Counterparty Details before sending for signature.",
    };
  }

  // Reuse an existing open request if present
  const list = read();
  const existing = list.find(
    (s) => s.recordId === recordId && s.status === "sent"
  );
  if (rec.status !== "Approved" && !existing) {
    return {
      ok: false,
      error: "Only Approved NDAs can be sent for signature.",
    };
  }

  let token, sentAt, reused, counterpartyName, recordTitle;
  if (existing) {
    token = existing.token;
    sentAt = existing.sentAt;
    reused = true;
    counterpartyName = existing.counterpartyName;
    recordTitle = existing.recordTitle;
    // Re-mirror to server in case a previous send failed to persist (heals
    // tokens created before the server store was writable).
    await serverUpsert({
      ...existing,
      recordSnapshot: {
        id: rec.id,
        title: rec.title,
        type: rec.type,
        counterparty: rec.counterparty || rec.form?.counterpartyName || "",
        form: rec.form || {},
        templateId: rec.templateId || "",
      },
    });
  } else {
    token = newToken();
    sentAt = Date.now();
    reused = false;
    counterpartyName = rec.form?.counterpartyName || rec.counterparty || "";
    recordTitle = rec.title;
    const entry = {
      token,
      recordId,
      recordTitle,
      counterpartyName,
      counterpartySignerName:
        rec.form?.counterpartySignerName || rec.form?.counterpartyContact || "",
      email,
      sentAt,
      status: "sent", // sent | viewed | signed | declined
      viewedAt: null,
      signedAt: null,
      signatureName: null,
      signatureTitle: null,
      signedDocId: null,
    };
    write([entry, ...list].slice(0, 200));
    // Mirror to server so any recipient (any device/browser) can resolve the token.
    await serverUpsert({
      ...entry,
      // Include a minimal record snapshot so /sign/[token] can render without
      // depending on the sender's localStorage.
      recordSnapshot: {
        id: rec.id,
        title: rec.title,
        type: rec.type,
        counterparty: rec.counterparty || rec.form?.counterpartyName || "",
        form: rec.form || {},
        templateId: rec.templateId || "",
      },
    });
    setRequestStatus(recordId, "Awaiting Signature", `Sent to ${email}`);
    logAuditEvent({
      action: "Sent for e-signature",
      target: `${rec.title} → ${email}`,
      recordId,
    });
  }

  const url = signingUrl(token);

  // Fire the real email send (server-side via /api/send-signature-email).
  let emailDelivered = false;
  let emailError = null;
  let emailConfigured = true;
  let messageId = null;
  try {
    if (typeof window !== "undefined") {
      const resp = await fetch("/api/send-signature-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          recordId,
          recordTitle,
          counterpartyName,
          url,
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok && data.ok) {
        emailDelivered = true;
        messageId = data.messageId || null;
        logAuditEvent({
          action: "Signing email delivered",
          target: `${email} (msg ${messageId || "n/a"})`,
          recordId,
        });
      } else {
        emailDelivered = false;
        emailConfigured = data.configured !== false;
        emailError =
          data.error ||
          `Email delivery failed (HTTP ${resp.status}).`;
        logAuditEvent({
          action: "Signing email delivery failed",
          target: `${email} — ${emailError}`,
          recordId,
        });
      }
    }
  } catch (e) {
    emailDelivered = false;
    emailError = e?.message || "Network error contacting email service.";
    logAuditEvent({
      action: "Signing email delivery failed",
      target: `${email} — ${emailError}`,
      recordId,
    });
  }

  return {
    ok: true,
    reused,
    token,
    url,
    email,
    sentAt,
    recordId,
    recordTitle,
    counterpartyName,
    emailDelivered,
    emailConfigured,
    emailError,
    messageId,
  };
}

export function getSignatureRequest(token) {
  return read().find((s) => s.token === token) || null;
}

/**
 * Resolve a signature request locally first, then fall back to the server
 * store. When we hydrate from the server, we also seed localStorage so the
 * rest of the flow (markViewed, completeSignature) works on this device.
 */
export async function getSignatureRequestAsync(token) {
  const local = getSignatureRequest(token);
  if (local) return local;
  const remote = await fetchServerSignature(token);
  if (!remote) return null;
  const list = read();
  if (!list.find((s) => s.token === token)) {
    write([remote, ...list].slice(0, 200));
  }
  return remote;
}

export function getSignaturesForRecord(recordId) {
  return read()
    .filter((s) => s.recordId === recordId)
    .sort((a, b) => b.sentAt - a.sentAt);
}

export function markViewed(token) {
  const list = read();
  const idx = list.findIndex((s) => s.token === token);
  if (idx < 0) return null;
  if (!list[idx].viewedAt) {
    list[idx].viewedAt = Date.now();
    write(list);
    serverPatch(token, { viewedAt: list[idx].viewedAt });
    logAuditEvent({
      action: "Signing link opened by counterparty",
      target: list[idx].email,
      recordId: list[idx].recordId,
    });
  }
  return list[idx];
}

/**
 * Counterparty completes the e-signature.
 * - Stamps signature info on the signature request
 * - Records a "signed" document in the docs store and attaches its id
 * - Updates the NDA record with signedAt + signedBy
 * - Flips status to "Signed" (overall NDA process complete)
 */
export async function completeSignature(
  token,
  { signatureName, signatureTitle, signatureImage, signatureMethod }
) {
  const list = read();
  const idx = list.findIndex((s) => s.token === token);
  if (idx < 0) return { ok: false, error: "Signature request not found." };
  const sig = list[idx];
  if (sig.status === "signed") {
    return { ok: false, error: "This document has already been signed." };
  }

  // Sender's record (may be missing on the recipient's device — that's OK,
  // we use the snapshot embedded in the signature row in that case).
  const rec = getRequest(sig.recordId) || null;

  const signedDocId =
    "DOC-SIGNED-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const signedAt = Date.now();

  // Only persist sender-side artefacts when we actually have the record.
  if (rec) {
    recordGeneratedDoc({
      id: signedDocId,
      recordId: sig.recordId,
      recordTitle: sig.recordTitle,
      templateId: rec.templateId || "",
      templateName: "Counter-signed NDA",
      templateVersion: "Signed",
      generatedAt: signedAt,
      generatedBy: signatureName,
      counterparty: sig.counterpartyName,
      placeholders: 0,
      placeholdersFilled: 0,
      signed: true,
      signedBy: signatureName,
      signerTitle: signatureTitle,
      signerEmail: sig.email,
      signatureImage: signatureImage || null,
      signatureMethod: signatureMethod || "typed",
    });
  }

  // Update the signature request (small payload — image only, no PDF)
  list[idx] = {
    ...sig,
    status: "signed",
    signedAt,
    signatureName,
    signatureTitle,
    signatureImage: signatureImage || null,
    signatureMethod: signatureMethod || "typed",
    signedDocId,
  };
  write(list);
  await serverPatch(token, {
    status: "signed",
    signedAt,
    signatureName,
    signatureTitle,
    signatureImage: signatureImage || null,
    signatureMethod: signatureMethod || "typed",
    signedDocId,
  });

  // Attach signed metadata to the NDA record itself + flip status to Signed.
  if (rec) {
    upsertRequest({
      ...rec,
      signedAt,
      signedBy: signatureName,
      signerTitle: signatureTitle,
      signedDocId,
      signerEmail: sig.email,
      signatureImage: signatureImage || null,
    });
    setRequestStatus(sig.recordId, "Signed", `Counter-signed by ${signatureName}`);
  }

  logAuditEvent({
    actor: signatureName,
    action: `NDA counter-signed (${signatureMethod || "typed"})`,
    target: `${sig.recordTitle} (${sig.email})`,
    recordId: sig.recordId,
  });

  return { ok: true, signedDocId, signedAt };
}

/**
 * Build the signed-NDA PDF for a record on demand. Uses the stored
 * template + intake form + the counterparty's captured signature image so
 * the resulting file always has placeholders filled and the signature
 * stamped at the counterparty signature block.
 *
 * Returns { ok, blob, filename } on success.
 */
export async function buildSignedPdfBlob(recordId) {
  const rec = getRequest(recordId);
  if (!rec) return { ok: false, error: "Record not found." };
  if (!rec.signedAt || !rec.signedBy) {
    return { ok: false, error: "This NDA has not been counter-signed yet." };
  }
  const template = getTemplateById(rec.templateId);
  if (!template) return { ok: false, error: "Template not found." };

  const form = {
    ...(rec.form || {}),
    counterpartyName:
      rec.form?.counterpartyName || rec.counterparty || "",
    recordTitle: rec.form?.recordTitle || rec.title,
    counterpartySignerName:
      rec.signedBy || rec.form?.counterpartySignerName || "",
    counterpartySignerTitle:
      rec.signerTitle ||
      rec.form?.counterpartySignerTitle ||
      "Authorized Signatory",
  };
  const values = buildPlaceholderValues(form);
  const blob = await generatePdf({
    template,
    values,
    meta: {
      documentId: rec.signedDocId || "SIGNED",
      recordId,
      recordTitle: rec.title,
      signatureImage: rec.signatureImage,
      signedBy: rec.signedBy,
      signerTitle: rec.signerTitle,
      signedAt: rec.signedAt,
    },
  });
  const safe = (rec.title || recordId).replace(/[^A-Za-z0-9]+/g, "_");
  return { ok: true, blob, filename: `${safe}_SIGNED.pdf` };
}

export async function declineSignature(token, reason = "") {
  const list = read();
  const idx = list.findIndex((s) => s.token === token);
  if (idx < 0) return { ok: false, error: "Signature request not found." };
  list[idx] = {
    ...list[idx],
    status: "declined",
    declinedAt: Date.now(),
    declineReason: reason,
  };
  write(list);
  await serverPatch(token, {
    status: "declined",
    declinedAt: list[idx].declinedAt,
    declineReason: reason,
  });
  setRequestStatus(
    list[idx].recordId,
    "In Review",
    `Signature declined: ${reason || "no reason"}`
  );
  logAuditEvent({
    action: "Signature declined by counterparty",
    target: list[idx].email + (reason ? ` — ${reason}` : ""),
    recordId: list[idx].recordId,
  });
  return { ok: true };
}

/**
 * Reconcile sender-side local state with the server signature store.
 * Called on the sender's device (app layout / repository) to pick up
 * signature completions made on the recipient's device — flips local
 * record status to "Signed" / "In Review" (decline) accordingly.
 *
 * Returns the number of records updated so callers can refresh UI / toast.
 */
export async function syncSignatureStatuses() {
  if (typeof window === "undefined") return 0;
  let signatures = [];
  try {
    const r = await fetch("/api/signatures", { cache: "no-store" });
    if (!r.ok) return 0;
    const data = await r.json();
    signatures = Array.isArray(data?.signatures) ? data.signatures : [];
  } catch {
    return 0;
  }
  const local = read();
  const byToken = new Map(local.map((s) => [s.token, s]));
  let changed = 0;

  for (const remote of signatures) {
    if (!remote || !remote.token || !remote.recordId) continue;
    const existing = byToken.get(remote.token);

    // Only care about senders — the recipient device may not have the NDA
    // record at all; getRequest() returning null is the signal we're not
    // the sender for this signature and should skip status reconciliation.
    const rec = getRequest(remote.recordId);

    // Merge the remote row into local cache so audit / UI sees the latest
    // signedAt/signatureName fields even on the sender side.
    if (!existing || existing.status !== remote.status || existing.signedAt !== remote.signedAt) {
      const idx = local.findIndex((s) => s.token === remote.token);
      if (idx >= 0) local[idx] = { ...local[idx], ...remote };
      else local.unshift(remote);
      changed++;
    }

    if (!rec) continue;

    if (remote.status === "signed" && rec.status !== "Signed") {
      upsertRequest({
        ...rec,
        signedAt: remote.signedAt || Date.now(),
        signedBy: remote.signatureName || rec.signedBy,
        signerTitle: remote.signatureTitle || rec.signerTitle,
        signedDocId: remote.signedDocId || rec.signedDocId,
        signerEmail: remote.email || rec.signerEmail,
        signatureImage: remote.signatureImage || rec.signatureImage,
      });
      setRequestStatus(
        rec.id,
        "Signed",
        `Counter-signed by ${remote.signatureName || "counterparty"}`
      );
      changed++;
    } else if (remote.status === "declined" && rec.status !== "In Review") {
      setRequestStatus(
        rec.id,
        "In Review",
        `Signature declined${remote.declineReason ? `: ${remote.declineReason}` : ""}`
      );
      changed++;
    } else if (
      (remote.status === "viewed" || remote.viewedAt) &&
      rec.status === "Awaiting Signature" &&
      !rec.signatureViewedAt
    ) {
      upsertRequest({ ...rec, signatureViewedAt: remote.viewedAt });
      changed++;
    }
  }
  if (changed) write(local.slice(0, 200));
  return changed;
}
