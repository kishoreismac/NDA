// Server-side custom templates store. Persists user-created NDA templates
// to the same data directory as requests/signatures (works locally and on
// Azure App Service).
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
const FILE = path.join(DATA_DIR, "templates.json");
// eslint-disable-next-line no-console
console.log(`[templates] store path: ${FILE}`);

function readAll() {
  try {
    if (!fs.existsSync(FILE)) return {};
    return JSON.parse(fs.readFileSync(FILE, "utf8") || "{}");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[templates] readAll failed:", e?.message);
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
    console.error("[templates] writeAll failed:", e?.message);
    return false;
  }
}

export async function GET() {
  const all = readAll();
  return Response.json({ ok: true, templates: Object.values(all) });
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
          { ok: false, error: "Failed to persist templates store." },
          { status: 500 }
        );
      }
      return Response.json({ ok: true, template: all[entry.id] });
    }

    if (action === "delete") {
      const { id } = body;
      if (!id) {
        return Response.json({ ok: false, error: "Missing id" }, { status: 400 });
      }
      delete all[id];
      if (!writeAll(all)) {
        return Response.json(
          { ok: false, error: "Failed to persist templates store." },
          { status: 500 }
        );
      }
      return Response.json({ ok: true });
    }

    return Response.json({ ok: false, error: "Unknown action" }, { status: 400 });
  } catch (e) {
    return Response.json(
      { ok: false, error: e?.message || "Bad request" },
      { status: 400 }
    );
  }
}
