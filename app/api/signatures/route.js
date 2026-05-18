// Server-side signature store. Keeps minimal data (record title, summary,
// counterparty info, status) keyed by token so that ANY recipient on ANY
// device/browser can open the signing link and complete the workflow,
// regardless of where the original request was created.
//
// Persistence is file-based under .data/signatures.json so the store
// survives normal restarts on a single Azure App Service instance.

import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "signatures.json");

function readAll() {
  try {
    if (!fs.existsSync(FILE)) return {};
    return JSON.parse(fs.readFileSync(FILE, "utf8") || "{}");
  } catch {
    return {};
  }
}

function writeAll(obj) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(obj), "utf8");
  } catch {}
}

export async function GET(req) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  if (!token) {
    return Response.json({ ok: false, error: "Missing token." }, { status: 400 });
  }
  const all = readAll();
  const sig = all[token];
  if (!sig) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return Response.json({ ok: true, signature: sig });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { token, action = "upsert", patch } = body || {};
    if (!token) {
      return Response.json({ ok: false, error: "Missing token." }, { status: 400 });
    }
    const all = readAll();
    if (action === "upsert") {
      all[token] = { ...(all[token] || {}), ...body.entry, token };
      writeAll(all);
      return Response.json({ ok: true, signature: all[token] });
    }
    if (action === "patch") {
      if (!all[token]) {
        return Response.json({ ok: false, error: "Not found" }, { status: 404 });
      }
      all[token] = { ...all[token], ...(patch || {}) };
      writeAll(all);
      return Response.json({ ok: true, signature: all[token] });
    }
    return Response.json({ ok: false, error: "Unknown action." }, { status: 400 });
  } catch (e) {
    return Response.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
