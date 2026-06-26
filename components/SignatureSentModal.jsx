"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Copy,
  CheckCircle2,
  ExternalLink,
  X,
  AlertTriangle,
  Send,
} from "lucide-react";

/**
 * Modal shown after "Send to Sign" succeeds.
 *
 * Surfaces:
 *  - whether the email was actually delivered via the configured SMTP
 *  - the signing link (copyable)
 *  - a "Send via my mail client" button that opens the user's default mail
 *    application with the message pre-filled — guaranteed to work even
 *    when SMTP is not configured on the server.
 */
export default function SignatureSentModal({ info, onClose }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  if (!info) return null;

  const subject = `Action required: counter-sign "${
    info.recordTitle || info.recordId
  }"`;
  const bodyText = [
    `Hello${info.counterpartyName ? " " + info.counterpartyName : ""},`,
    ``,
    `Please review and counter-sign the Non-Disclosure Agreement "${
      info.recordTitle || info.recordId
    }" (record ${info.recordId}).`,
    ``,
    `Use this secure signing link (click to open):`,
    `<${info.url}>`,
    ``,
    `Or copy and paste this URL into your browser:`,
    info.url,
    ``,
    `Your signature will be returned to our CLM system automatically.`,
    ``,
    `Thank you.`,
  ].join("\n");

  const mailtoHref = `mailto:${encodeURIComponent(
    info.email
  )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    bodyText
  )}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(info.url);
      setCopied(true);
    } catch {}
  };

  let badge;
  if (info.emailDelivered) {
    badge = (
      <div className="mt-4 flex items-start gap-2 bg-emerald-500/10 border border-emerald-400/30 rounded-lg px-3 py-2 text-xs text-emerald-200">
        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
        <div>
          <div className="font-semibold">Email delivered</div>
          <div className="text-emerald-200/80">
            Sent to <span className="font-mono">{info.email}</span>
            {info.messageId ? (
              <>
                {" "}· message id{" "}
                <span className="font-mono">{info.messageId}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else if (info.emailConfigured === false) {
    badge = (
      <div className="mt-4 flex items-start gap-2 bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
        <div>
          <div className="font-semibold">
            SMTP not configured on this server
          </div>
          <div className="text-amber-200/80">
            Add <span className="font-mono">SMTP_HOST</span>,{" "}
            <span className="font-mono">SMTP_USER</span>,{" "}
            <span className="font-mono">SMTP_PASS</span> (and friends) to{" "}
            <span className="font-mono">.env.local</span> — see{" "}
            <span className="font-mono">.env.local.example</span> — then
            restart <span className="font-mono">npm run dev</span>. Meanwhile,
            use <em>Send via my mail client</em> below to deliver the link now.
          </div>
        </div>
      </div>
    );
  } else {
    badge = (
      <div className="mt-4 flex items-start gap-2 bg-rose-500/10 border border-rose-400/30 rounded-lg px-3 py-2 text-xs text-rose-200">
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
        <div>
          <div className="font-semibold">Email delivery failed</div>
          <div className="text-rose-200/80">
            {info.emailError || "The mail server rejected the message."} Use{" "}
            <em>Send via my mail client</em> below to deliver the link now.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="signature-sent-modal" className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-navy-900 border border-emerald-400/30 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <Mail className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {info.reused
                  ? "Signing link already issued"
                  : "Document sent for e-signature"}
              </h3>
              <p className="text-xs text-slate-400">
                Record {info.recordId} → Awaiting Signature
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {badge}

        <div className="mt-4 bg-black/30 border border-white/10 rounded-lg p-4 text-sm">
          <div className="text-xs text-slate-400">Sent to</div>
          <div className="text-white font-medium">{info.email}</div>
          <div className="mt-3 text-xs text-slate-400">Subject</div>
          <div className="text-slate-100">{subject}</div>
          <div className="mt-3 text-xs text-slate-400">Body</div>
          <div className="text-slate-200 leading-relaxed whitespace-pre-line text-xs">
            {bodyText}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-slate-400 mb-1">Secure signing link</div>
          <div className="flex items-stretch gap-2">
            <input
              data-testid="signing-link-input"
              readOnly
              value={info.url}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-mono"
            />
            <button
              onClick={copy}
              className="px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-slate-200 inline-flex items-center gap-1"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="text-sm text-slate-300 px-3 py-2"
          >
            Close
          </button>
          <a
            href={mailtoHref}
            className="inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-100 px-4 py-2 rounded-xl text-sm"
            title="Open your default mail client with the message pre-filled"
          >
            <Send className="w-4 h-4" /> Send via my mail client
          </a>
          <a
            data-testid="open-signing-page"
            href={info.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-100 px-4 py-2 rounded-xl text-sm"
          >
            <ExternalLink className="w-4 h-4" /> Open signing page
          </a>
        </div>
      </div>
    </div>
  );
}
