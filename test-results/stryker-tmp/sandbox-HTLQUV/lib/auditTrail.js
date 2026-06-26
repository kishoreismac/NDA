// @ts-nocheck
// Simple localStorage-backed audit trail for demo persistence.

const KEY = "ndaflow.audit.v1";
const DOCS_KEY = "ndaflow.docs.v1";

const seedAudit = [
  { id: "a-001", ts: Date.now() - 1000 * 60 * 60 * 22, actor: "Sara Patel", action: "Template selected", target: "Mutual NDA v4.2", recordId: "NDA-2041" },
  { id: "a-002", ts: Date.now() - 1000 * 60 * 60 * 20, actor: "Sara Patel", action: "Template previewed", target: "Mutual NDA v4.2", recordId: "NDA-2041" },
  { id: "a-003", ts: Date.now() - 1000 * 60 * 60 * 18, actor: "NDAFlow", action: "Placeholder values validated", target: "16/16 ready", recordId: "NDA-2041" },
  { id: "a-004", ts: Date.now() - 1000 * 60 * 60 * 17, actor: "Sara Patel", action: "Final NDA generated", target: "Mutual NDA v4.2 → DOC-AB12CD", recordId: "NDA-2041" },
  { id: "a-005", ts: Date.now() - 1000 * 60 * 60 * 16, actor: "Sara Patel", action: "DOCX downloaded", target: "DOC-AB12CD.docx", recordId: "NDA-2041" },
  { id: "a-006", ts: Date.now() - 1000 * 60 * 60 * 4, actor: "Jordan Nguyen", action: "Risk Review document downloaded", target: "DOC-AB12CD.pdf", recordId: "NDA-2041" },
];

function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function write(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function getAuditLog() {
  const list = read(KEY, null);
  if (!list) {
    write(KEY, seedAudit);
    return [...seedAudit].sort((a, b) => b.ts - a.ts);
  }
  return [...list].sort((a, b) => b.ts - a.ts);
}

export function logAuditEvent({ actor = "Sara Patel", action, target = "", recordId = "" }) {
  const list = read(KEY, seedAudit);
  const entry = {
    id: "a-" + Math.random().toString(36).slice(2, 8),
    ts: Date.now(),
    actor,
    action,
    target,
    recordId,
  };
  const next = [entry, ...list].slice(0, 200);
  write(KEY, next);
  return entry;
}

// ---- generated documents store ----

const seedDocs = [
  {
    id: "DOC-AB12CD",
    recordId: "NDA-2041",
    recordTitle: "Acme Robotics — Joint R&D",
    templateId: "tpl-mutual",
    templateName: "Mutual NDA",
    templateVersion: "v4.2",
    generatedAt: Date.now() - 1000 * 60 * 60 * 17,
    generatedBy: "Sara Patel",
    counterparty: "Acme Robotics Inc.",
    placeholders: 16,
    placeholdersFilled: 16,
  },
  {
    id: "DOC-EF34GH",
    recordId: "NDA-2039",
    recordTitle: "Hooli Cloud — Hosting Eval",
    templateId: "tpl-vendor",
    templateName: "Vendor / Supplier NDA",
    templateVersion: "v3.0",
    generatedAt: Date.now() - 1000 * 60 * 60 * 32,
    generatedBy: "Maya Davis",
    counterparty: "Hooli Cloud",
    placeholders: 15,
    placeholdersFilled: 15,
  },
];

export function getGeneratedDocs() {
  const list = read(DOCS_KEY, null);
  if (!list) {
    write(DOCS_KEY, seedDocs);
    return [...seedDocs].sort((a, b) => b.generatedAt - a.generatedAt);
  }
  return [...list].sort((a, b) => b.generatedAt - a.generatedAt);
}

export function recordGeneratedDoc(doc) {
  const list = read(DOCS_KEY, seedDocs);
  const next = [doc, ...list.filter((d) => d.id !== doc.id)].slice(0, 100);
  write(DOCS_KEY, next);
  return doc;
}

export function getDocsForRecord(recordId) {
  return getGeneratedDocs().filter((d) => d.recordId === recordId);
}

export function formatTimestamp(ts) {
  const d = new Date(ts);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
