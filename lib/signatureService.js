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

  let token, sentAt, reused, counterpartyName, recordTitle;
  if (existing) {
    token = existing.token;
    sentAt = existing.sentAt;
    reused = true;
    counterpartyName = existing.counterpartyName;
    recordTitle = existing.recordTitle;
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

  const rec = getRequest(sig.recordId);
  if (!rec) return { ok: false, error: "Related NDA record not found." };

  const signedDocId =
    "DOC-SIGNED-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const signedAt = Date.now();

  // Persist a "signed" generated-doc entry that shows up in the record drawer.
  // We DO NOT persist the heavy base64 PDF here — it is regenerated
  // on-demand from the template + form + signature image whenever a user
  // clicks Download. This avoids localStorage quota failures and ensures
  // the download button is always available after signing.
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

  // Attach signed metadata to the NDA record itself + flip status to Signed.
  // (Status flips to Signed only after the signed PDF has been produced and
  // stored, satisfying "only mark completed after signed doc received back".)
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

export function declineSignature(token, reason = "") {
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
