// Server-side signature store. Keeps minimal data (record title, summary,
// counterparty info, status) keyed by token so that ANY recipient on ANY
// device/browser can open the signing link and complete the workflow,
// regardless of where the original request was created.
//
// Persistence is file-based under .data/signatures.json so the store
// survives normal restarts on a single Azure App Service instance.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Resolve a writable + persistent data dir.
// - Azure App Service Linux: /home is a persistent mounted share that is
//   always writable, even when WEBSITE_RUN_FROM_PACKAGE makes wwwroot
//   read-only. We use /home/data/ndaflow.
// - Azure App Service Windows: D:\home is the equivalent persistent share.
// - Local dev: fall back to ./.data relative to the project.
// - Last resort: OS temp dir (non-persistent but always writable).
function resolveDataDir() {
  const candidates = [];
  if (process.env.WEBSITE_INSTANCE_ID || process.env.WEBSITE_SITE_NAME) {
    // Azure App Service
    const home = process.env.HOME || (process.platform === "win32" ? "D:\\home" : "/home");
    candidates.push(path.join(home, "data", "ndaflow"));
  }
  candidates.push(path.join(process.cwd(), ".data"));
  candidates.push(path.join(os.tmpdir(), "ndaflow"));
  for (const dir of candidates) {
    try {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.accessSync(dir, fs.constants.W_OK);
      return dir;
    } catch {
      // try next candidate
    }
  }
  // Should never happen, but return temp as last resort
  return os.tmpdir();
}

const DATA_DIR = resolveDataDir();
const FILE = path.join(DATA_DIR, "signatures.json");
// Log once at module init so we can confirm the path in App Insights / log stream.
// eslint-disable-next-line no-console
console.log(`[signatures] store path: ${FILE}`);

function readAll() {
  try {
    if (!fs.existsSync(FILE)) return {};
    return JSON.parse(fs.readFileSync(FILE, "utf8") || "{}");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[signatures] readAll failed:", e?.message);
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
    console.error("[signatures] writeAll failed:", e?.message);
    return false;
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const all = readAll();
  if (!token) {
    // List all signatures (used by sender devices to reconcile status).
    return Response.json({ ok: true, signatures: Object.values(all) });
  }
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
    if (action === "reset") {
      if (process.env.NODE_ENV === "production") {
        return Response.json(
          { ok: false, error: "Reset is not available in production." },
          { status: 403 }
        );
      }
      const ok = writeAll({});
      if (!ok) {
        return Response.json(
          { ok: false, error: "Failed to reset signature store." },
          { status: 500 }
        );
      }
      return Response.json({ ok: true });
    }
    if (!token) {
      return Response.json({ ok: false, error: "Missing token." }, { status: 400 });
    }
    const all = readAll();
    if (action === "upsert") {
      all[token] = { ...(all[token] || {}), ...body.entry, token };
      const ok = writeAll(all);
      if (!ok) {
        return Response.json(
          { ok: false, error: "Failed to persist signature store on server." },
          { status: 500 }
        );
      }
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
