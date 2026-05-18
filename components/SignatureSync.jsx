"use client";

// Polls the server-side signature store on the sender's device and
// reconciles local NDA record statuses (Awaiting Signature → Signed).
// Runs on mount, on window focus, and every 30s while the tab is open.

import { useEffect } from "react";
import { syncSignatureStatuses } from "@/lib/signatureService";

export default function SignatureSync() {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const changed = await syncSignatureStatuses();
        if (cancelled) return;
        if (changed > 0) {
          // Let any list views refresh themselves.
          window.dispatchEvent(new CustomEvent("clm:requests-changed"));
          window.dispatchEvent(new CustomEvent("clm:signatures-changed"));
        }
      } catch {
        // silent — sync is best-effort
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
