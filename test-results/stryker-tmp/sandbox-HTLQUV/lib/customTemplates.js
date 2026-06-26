// @ts-nocheck
// Client-side custom NDA templates store. Reads from /api/templates and
// caches in localStorage so getTemplateById() can resolve a template
// synchronously the same way built-in templates do.

const LS_KEY = "ndaflow.customTemplates.v1";

function readCache() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeCache(list) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  } catch {}
}

export function getCustomTemplates() {
  return readCache();
}

export function getCustomTemplateById(id) {
  return readCache().find((t) => t.id === id) || null;
}

// Refresh the local cache from the server. Returns the updated list.
export async function refreshCustomTemplates() {
  if (typeof window === "undefined") return [];
  try {
    const res = await fetch("/api/templates", { cache: "no-store" });
    const data = await res.json();
    if (data?.ok && Array.isArray(data.templates)) {
      writeCache(data.templates);
      return data.templates;
    }
  } catch {}
  return readCache();
}

export async function saveCustomTemplate(entry) {
  // Persist to server
  try {
    const res = await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "upsert", entry }),
    });
    const data = await res.json();
    if (!data?.ok) throw new Error(data?.error || "Save failed");
  } catch (e) {
    throw e;
  }
  // Update local cache
  const list = readCache();
  const i = list.findIndex((t) => t.id === entry.id);
  if (i >= 0) list[i] = entry;
  else list.push(entry);
  writeCache(list);
  return entry;
}

export async function deleteCustomTemplate(id) {
  try {
    await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
  } catch {}
  writeCache(readCache().filter((t) => t.id !== id));
}

// Build a template object in the same shape as the built-in TEMPLATE_LIBRARY
// entries from a simple user-entered body of plain-text paragraphs.
// Each paragraph becomes a "paragraph" block. Lines starting with "# " are
// headings. Placeholder tokens look like {{Name}} and are auto-extracted.
export function buildTemplateFromText({
  id,
  name,
  type,
  jurisdiction,
  version,
  description,
  body,
  signatureParties,
}) {
  const lines = (body || "").split(/\r?\n/);
  const blocks = [{ type: "title", text: name || "NDA TEMPLATE" }, { type: "spacer" }];
  let buffer = [];
  const flush = () => {
    if (!buffer.length) return;
    blocks.push({ type: "paragraph", text: buffer.join(" ") });
    blocks.push({ type: "spacer" });
    buffer = [];
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith("# ")) {
      flush();
      blocks.push({ type: "heading", text: line.slice(2).trim() });
      continue;
    }
    buffer.push(line);
  }
  flush();

  const parties = (signatureParties && signatureParties.length
    ? signatureParties
    : [
        { party: "{{CompanyName}}", name: "{{AuthorizedSignerName}}", title: "{{AuthorizedSignerTitle}}" },
        { party: "{{CounterpartyName}}", name: "{{CounterpartySignerName}}", title: "{{CounterpartySignerTitle}}" },
      ]);
  blocks.push({ type: "signatureBlock", parties });

  const text = blocks
    .map((b) => (typeof b.text === "string" ? b.text : ""))
    .join(" ");
  const placeholders = Array.from(
    new Set(Array.from(text.matchAll(/\{\{(\w+)\}\}/g)).map((m) => m[1]))
  );

  return {
    id,
    name: name || "Untitled Template",
    type: type || "Custom",
    jurisdiction: jurisdiction || "—",
    version: version || "v1.0",
    updated: new Date().toISOString().slice(0, 10),
    status: "Active",
    description: description || "",
    clauses: blocks.filter((b) => b.type === "paragraph").length,
    placeholders,
    custom: true,
    content: blocks,
  };
}
