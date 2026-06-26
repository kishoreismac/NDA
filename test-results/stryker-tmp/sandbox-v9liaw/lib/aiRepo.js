// @ts-nocheck
// Helpers that bridge AI Tools with the NDA repository:
//   - findRecordByMention(): resolve a free-text reference (NDA-2041,
//     "wayne", "joint r&d", counterparty name, etc.) to an actual record.
//   - renderRecordAsText(): produce a synthetic contract text body for any
//     record by running the saved form values through its template. This
//     lets Extract & Review work on any repository document without the
//     user pasting anything.
//   - summarizeRecord(): build the structured per-record summary used by
//     the chat tab when the user asks about a specific NDA.

import { getRequests, getRequest, getExpirationTs } from "./requestStore";
import { getTemplateById } from "./templates";
import { buildPlaceholderValues, applyPlaceholders } from "./placeholders";
import { getSignaturesForRecord } from "./signatureService";

const norm = (s) => (s || "").toString().toLowerCase().trim();

export function findRecordByMention(q) {
  const records = getRequests();
  if (!records.length) return null;
  const s = norm(q);
  if (!s) return null;

  // 1) Exact NDA-#### token (with or without dash)
  const idMatch = s.match(/nda[-\s]?(\d{3,5})/i);
  if (idMatch) {
    const id = `NDA-${idMatch[1]}`;
    const hit = records.find((r) => r.id.toUpperCase() === id);
    if (hit) return hit;
  }

  // 2) Exact id substring
  const direct = records.find((r) => s.includes(norm(r.id)));
  if (direct) return direct;

  // 3) Counterparty name (longest match wins)
  const cpMatch = [...records]
    .filter((r) => {
      const cp = norm(r.counterparty || r.form?.counterpartyName);
      return cp && s.includes(cp);
    })
    .sort(
      (a, b) =>
        norm(b.counterparty || b.form?.counterpartyName).length -
        norm(a.counterparty || a.form?.counterpartyName).length
    )[0];
  if (cpMatch) return cpMatch;

  // 4) Title substring
  const titleMatch = records.find((r) => {
    const t = norm(r.title);
    if (!t) return false;
    // require at least one word of 4+ chars to overlap
    return t
      .split(/\s+/)
      .filter((w) => w.length >= 4)
      .some((w) => s.includes(w));
  });
  if (titleMatch) return titleMatch;

  return null;
}

// Produce a plain-text representation of the actual NDA document for a
// record (template + placeholder substitution). Falls back to a structured
// dump of the form when no template is bound.
export function renderRecordAsText(record) {
  if (!record) return "";
  const tpl = record.templateId
    ? getTemplateById(record.templateId)
    : getTemplateById("tpl-mutual");
  const values = buildPlaceholderValues(record.form || {});
  const lines = [];

  if (tpl) {
    for (const block of tpl.content) {
      if (block.type === "title") {
        lines.push(applyPlaceholders(block.text, values).toUpperCase(), "");
      } else if (block.type === "subtitle") {
        lines.push(applyPlaceholders(block.text, values), "");
      } else if (block.type === "heading") {
        lines.push("", applyPlaceholders(block.text, values));
      } else if (block.type === "paragraph") {
        lines.push(applyPlaceholders(block.text, values));
      } else if (block.type === "spacer") {
        lines.push("");
      } else if (block.type === "signatureBlock") {
        lines.push(
          "",
          "IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the Effective Date."
        );
        for (const p of block.parties) {
          lines.push(
            "",
            applyPlaceholders(p.party, values),
            "By: ____________________________________",
            `Name: ${applyPlaceholders(p.name, values)}`,
            `Title: ${applyPlaceholders(p.title || "", values)}`,
            `Date: __________________________`
          );
        }
      }
    }
  } else {
    lines.push(record.title || "");
    Object.entries(record.form || {}).forEach(([k, v]) => {
      if (v) lines.push(`${k}: ${v}`);
    });
  }
  return lines.join("\n");
}

function fmtDate(d) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return String(d);
  }
}

// Build a structured per-record summary used by chat answers.
export function summarizeRecord(record) {
  if (!record) return null;
  const f = record.form || {};
  const sigs = getSignaturesForRecord(record.id) || [];
  const latestSig = sigs[0];
  const signed = sigs.find((s) => s.status === "signed");

  // Compute expiry using the shared store helper so chat answers match
  // exactly what the Repository displays (handles "two (2) years", custom
  // endDate, etc.).
  const expiryTs = getExpirationTs(record);
  const expiry = expiryTs ? new Date(expiryTs) : null;
  const today = new Date();
  const daysToExpiry = expiry
    ? Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    : null;

  return {
    id: record.id,
    title: record.title,
    type: record.type,
    recordType: record.recordType || "NDA",
    status: record.status,
    risk: record.risk,
    riskScore: record.riskScore,
    owner: record.owner,
    counterparty: f.counterpartyName || record.counterparty || "—",
    counterpartyAddress: f.counterpartyAddress || "—",
    counterpartyContact: f.counterpartyContact || "—",
    counterpartyEmail: f.counterpartyEmail || "—",
    company: f.companyName || "Contoso Corporation",
    companyAddress: f.companyAddress || "—",
    purpose: f.purpose || "—",
    confidentialInformation: f.confidentialInformation || "—",
    effectiveDate: f.effectiveDate ? fmtDate(f.effectiveDate) : "—",
    term: f.term || "—",
    survival: f.survival || "—",
    governingLaw: f.governingLaw || f.jurisdiction || "—",
    jurisdiction: f.jurisdiction || "—",
    companySigner: f.companySignerName
      ? `${f.companySignerName}${
          f.companySignerTitle ? `, ${f.companySignerTitle}` : ""
        }`
      : "—",
    counterpartySigner: f.counterpartySignerName
      ? `${f.counterpartySignerName}${
          f.counterpartySignerTitle ? `, ${f.counterpartySignerTitle}` : ""
        }`
      : "—",
    expiry: expiry ? fmtDate(expiry) : "—",
    daysToExpiry,
    renewalDue:
      daysToExpiry !== null && daysToExpiry <= 90 && daysToExpiry >= 0,
    signatureStatus: signed
      ? `Signed on ${fmtDate(signed.signedAt)} by ${signed.signatureName}`
      : latestSig
      ? `Awaiting signature (sent ${fmtDate(latestSig.sentAt)} to ${
          latestSig.email
        })`
      : record.status === "Awaiting Signature"
      ? "Awaiting counter-signature"
      : record.status === "Signed"
      ? "Marked signed"
      : "Not yet sent for signature",
    signedAt: signed?.signedAt || record.signedAt || null,
    signedBy: signed?.signatureName || record.signedBy || null,
  };
}

export function getRecordById(id) {
  return getRequest(id);
}
