// @ts-nocheck
// Server-side requests store. Mirrors the per-browser localStorage cache so
// any user accessing the web app sees ALL documents from the repository,
// regardless of which device created them. File-based persistence under
// /home/data/ndaflow on Azure App Service (always-writable, persistent).

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function resolveDataDir() {
  const candidates = [];
  if (process.env.WEBSITE_INSTANCE_ID || process.env.WEBSITE_SITE_NAME) {
    const home =
      process.env.HOME ||
      (process.platform === "win32" ? "D:\\home" : "/home");
    candidates.push(path.join(home, "data", "ndaflow"));
  }
  candidates.push(path.join(process.cwd(), ".data"));
  candidates.push(path.join(os.tmpdir(), "ndaflow"));
  for (const dir of candidates) {
    try {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.accessSync(dir, fs.constants.W_OK);
      return dir;
    } catch {}
  }
  return os.tmpdir();
}

const DATA_DIR = resolveDataDir();
const FILE = path.join(DATA_DIR, "requests.json");
// eslint-disable-next-line no-console
console.log(`[requests] store path: ${FILE}`);

function readAll() {
  try {
    if (!fs.existsSync(FILE)) return {};
    return JSON.parse(fs.readFileSync(FILE, "utf8") || "{}");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[requests] readAll failed:", e?.message);
    return {};
  }
}

function writeAll(obj) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(obj), "utf8");
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[requests] writeAll failed:", e?.message);
    return false;
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const all = readAll();
  if (!id) {
    return Response.json({ ok: true, requests: Object.values(all) });
  }
  const r = all[id];
  if (!r) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return Response.json({ ok: true, request: r });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { action = "upsert" } = body || {};
    const all = readAll();

    if (action === "upsert") {
      const entry = body.entry;
      if (!entry || !entry.id) {
        return Response.json(
          { ok: false, error: "Missing entry.id" },
          { status: 400 }
        );
      }
      all[entry.id] = { ...(all[entry.id] || {}), ...entry };
      if (!writeAll(all)) {
        return Response.json(
          { ok: false, error: "Failed to persist requests store." },
          { status: 500 }
        );
      }
      return Response.json({ ok: true, request: all[entry.id] });
    }

    if (action === "delete") {
      const { id } = body;
      if (!id) {
        return Response.json({ ok: false, error: "Missing id" }, { status: 400 });
      }
      if (all[id]) {
        delete all[id];
        writeAll(all);
      }
      return Response.json({ ok: true });
    }

    if (action === "bulk-upsert") {
      // Used on first-load seeding from a fresh browser. Only writes records
      // that are missing on the server — never overwrites existing ones.
      const entries = Array.isArray(body.entries) ? body.entries : [];
      let added = 0;
      for (const e of entries) {
        if (!e?.id) continue;
        if (!all[e.id]) {
          all[e.id] = e;
          added++;
        }
      }
      if (added > 0) writeAll(all);
      return Response.json({ ok: true, added });
    }

    return Response.json(
      { ok: false, error: "Unknown action." },
      { status: 400 }
    );
  } catch (e) {
    return Response.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
