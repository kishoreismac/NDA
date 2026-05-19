"use client";

// Polls the server-side stores (signatures + requests) on every device
// and reconciles local state so every user of the web app sees the same
// repository contents and signature status.
// Runs on mount, on window focus, and every 30s while the tab is open.

import { useEffect } from "react";
import { syncSignatureStatuses } from "@/lib/signatureService";
import { syncRequests } from "@/lib/requestStore";

export default function SignatureSync() {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        // Pull global requests first so signature reconciliation sees the
        // latest record set.
        const reqChanged = await syncRequests();
        if (cancelled) return;
        const sigChanged = await syncSignatureStatuses();
        if (cancelled) return;
        if (reqChanged > 0 || sigChanged > 0) {
          window.dispatchEvent(new CustomEvent("clm:requests-changed"));
          window.dispatchEvent(new CustomEvent("clm:signatures-changed"));
        }
      } catch {
        // silent — best-effort
      }
    };

    run();
    const onFocus = () => run();
    window.addEventListener("focus", onFocus);
    const id = setInterval(run, 30000);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
      clearInterval(id);
    };
  }, []);

  return null;
}

