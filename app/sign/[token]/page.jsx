"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSignatureRequest,
  getSignatureRequestAsync,
  markViewed,
  completeSignature,
  declineSignature,
  buildSignedPdfBlob,
} from "@/lib/signatureService";
import { getRequest } from "@/lib/requestStore";
import SignaturePad from "@/components/SignaturePad";
import {
  CheckCircle2,
  XCircle,
  Shield,
  FileText,
  Mail,
  Calendar,
  PenTool,
  AlertTriangle,
  Loader2,
  Download,
} from "lucide-react";

export default function SignPage({ params }) {
  const { token } = params;
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sig, setSig] = useState(null);
  const [rec, setRec] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [agree, setAgree] = useState(false);
  const [sigImage, setSigImage] = useState(null);
  const [sigMethod, setSigMethod] = useState("draw");
  const [showDecline, setShowDecline] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    let cancelled = false;
    (async () => {
      const s = await getSignatureRequestAsync(token);
      if (cancelled) return;
      if (!s) {
        setError("This signing link is invalid or has expired.");
        return;
      }
      markViewed(token);
      setSig(s);
      // Prefer the sender-side record (full data + history) if it lives in
      // this browser; otherwise fall back to the snapshot embedded in the
      // signature row so the recipient still sees full document details.
      const r = getRequest(s.recordId) || s.recordSnapshot || null;
      setRec(r);
      setName(s.counterpartySignerName || "");
      setTitle("Authorized Signatory");
      if (s.status === "signed") setDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const fmt = (ts) =>
    new Date(ts).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const previewLines = useMemo(() => {
    if (!rec) return [];
    const f = rec.form || {};
    return [
      ["Counterparty", f.counterpartyName || rec.counterparty || "—"],
      ["Counterparty Address", f.counterpartyAddress || "—"],
      ["Company", f.companyName || "—"],
      ["Company Address", f.companyAddress || "—"],
      ["Purpose", f.purpose || "—"],
      ["Effective Date", f.effectiveDate || "—"],
      ["Term", f.term || "—"],
      ["Survival", f.survival || "—"],
      ["Governing Law", f.governingLaw || f.jurisdiction || "—"],
    ];
  }, [rec]);

  if (!mounted) return null;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <AlertTriangle className="w-10 h-10 text-rose-300 mx-auto mb-3" />
          <h1 className="text-xl font-semibold text-white">Link unavailable</h1>
          <p className="mt-2 text-sm text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!sig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
      </div>
    );
  }

  if (done || sig.status === "signed") {
    return (
      <div className="min-h-screen px-6 py-10 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white/5 border border-emerald-400/30 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-9 h-9 text-emerald-300" />
          </div>
          <h1 className="text-2xl font-semibold text-white">
            Thank you — the NDA is now signed
          </h1>
          <p className="mt-3 text-slate-300">
            Your counter-signature has been recorded and the signed PDF was sent
            back to <span className="text-white font-medium">{sig.recordTitle}</span>.
            The NDA process is now marked complete.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-left text-xs text-slate-300">
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-slate-400">Signed by</div>
              <div className="text-white font-medium">
                {sig.signatureName || name || "—"}
              </div>
              <div className="text-slate-400">{sig.signatureTitle || title}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-slate-400">Signed at</div>
              <div className="text-white font-medium">
                {sig.signedAt ? fmt(sig.signedAt) : fmt(Date.now())}
              </div>
              <div className="text-slate-400">Record: {sig.recordId}</div>
            </div>
          </div>
          {sig.signatureImage && (
            <div className="mt-4 bg-white rounded-md border border-emerald-400/40 p-3 inline-block">
              <div className="text-[11px] text-slate-500 mb-1 text-left">
                Applied signature
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sig.signatureImage}
                alt="signature"
                className="max-h-20"
              />
            </div>
          )}
          <div className="mt-6">
            <button
              onClick={async () => {
                setError("");
                setDownloading(true);
                try {
                  const res = await buildSignedPdfBlob(sig.recordId);
                  if (!res.ok) {
                    setError(res.error || "Unable to build signed PDF.");
                    return;
                  }
                  const url = URL.createObjectURL(res.blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = res.filename;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  setTimeout(() => URL.revokeObjectURL(url), 1500);
                } catch (e) {
                  setError(e?.message || "Download failed.");
                } finally {
                  setDownloading(false);
                }
              }}
              disabled={downloading}
              className="inline-flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-100 px-4 py-2 rounded-xl text-sm disabled:opacity-50"
            >
              {downloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Download Signed NDA (PDF)
            </button>
            <p className="mt-2 text-[11px] text-slate-400">
              A copy with your signature embedded is also stored in the
              originating team's CLM repository.
            </p>
            {error && (
              <p className="mt-2 text-xs text-rose-300">{error}</p>
            )}
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-8 inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-100 px-4 py-2 rounded-xl text-sm"
          >
            Return to CLM Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (sig.status === "declined") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white/5 border border-rose-400/30 rounded-2xl p-8 text-center">
          <XCircle className="w-10 h-10 text-rose-300 mx-auto mb-3" />
          <h1 className="text-xl font-semibold text-white">Signature declined</h1>
          <p className="mt-2 text-sm text-slate-300">
            You declined to sign this NDA. The originating team has been notified.
          </p>
        </div>
      </div>
    );
  }

  const onSign = async () => {
    setError("");
    if (!name.trim() || !title.trim()) {
      setError("Please enter your full name and title.");
      return;
    }
    if (!sigImage) {
      setError(
        "Please apply your signature (draw it, type it, or upload an image)."
      );
      return;
    }
    if (!agree) {
      setError("Please confirm you agree to be bound by the terms.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await completeSignature(token, {
        signatureName: name.trim(),
        signatureTitle: title.trim(),
        signatureImage: sigImage,
        signatureMethod: sigMethod,
      });
      if (!res.ok) {
        setError(res.error || "Unable to record signature.");
        return;
      }
      const fresh = getSignatureRequest(token);
      setSig(fresh);
      setDone(true);
    } catch (e) {
      setError(e?.message || "Unable to record signature.");
    } finally {
      setSubmitting(false);
    }
  };

  const onDecline = async () => {
    const res = await declineSignature(token, declineReason.trim());
    if (res.ok) {
      const fresh = (await getSignatureRequestAsync(token)) || getSignatureRequest(token);
      setSig(fresh);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600/30 to-cyan-600/20 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <Shield className="w-5 h-5 text-cyan-300" />
            <span className="font-semibold">CLM Secure E-Signature</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-400">Token {token.slice(0, 14)}…</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
            {sig.recordTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            You have been requested to review and counter-sign the Non-Disclosure
            Agreement below.
          </p>
          <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs">
            <Info icon={Mail} label="Sent to" value={sig.email} />
            <Info icon={Calendar} label="Sent at" value={fmt(sig.sentAt)} />
            <Info icon={FileText} label="Record ID" value={sig.recordId} />
          </div>
        </div>

        {/* Document preview */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
            <FileText className="w-4 h-4" />
            <span className="font-semibold text-white">Document Summary</span>
          </div>
          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {previewLines.map(([k, v]) => (
              <div key={k} className="border-b border-white/5 pb-2">
                <dt className="text-xs text-slate-400">{k}</dt>
                <dd className="text-white">{v}</dd>
              </div>
            ))}
          </dl>
          {rec?.form?.confidentialInformation && (
            <div className="mt-4 bg-black/30 border border-white/10 rounded-lg p-4 text-sm text-slate-200 leading-relaxed">
              <div className="text-xs text-slate-400 mb-1">
                Confidential Information
              </div>
              {rec.form.confidentialInformation}
            </div>
          )}
        </div>

        {/* Signature panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
            <PenTool className="w-4 h-4 text-cyan-300" />
            <span className="font-semibold text-white">Your Counter-Signature</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs text-slate-400">Full Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
                placeholder="Type your full legal name"
              />
            </label>
            <label className="block">
              <span className="text-xs text-slate-400">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
                placeholder="e.g. Chief Technology Officer"
              />
            </label>
            <div className="sm:col-span-2">
              <span className="text-xs text-slate-400">Apply Signature</span>
              <div className="mt-1">
                <SignaturePad
                  defaultName={name}
                  onChange={(dataUrl, method) => {
                    setSigImage(dataUrl);
                    setSigMethod(method);
                  }}
                />
              </div>
            </div>
            {sigImage && (
              <div className="sm:col-span-2">
                <div className="bg-white rounded-md border border-emerald-400/40 p-3">
                  <div className="text-[11px] text-slate-500 mb-1">
                    Captured signature ({sigMethod})
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sigImage}
                    alt="signature preview"
                    className="max-h-24"
                  />
                </div>
              </div>
            )}
            <label className="sm:col-span-2 flex items-start gap-2 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
              />
              <span>
                I have reviewed the document and agree to be legally bound by
                its terms. The signature above is my electronic signature and
                has the same legal effect as a hand-written signature.
              </span>
            </label>
          </div>

          {error && (
            <div className="mt-4 bg-rose-500/10 border border-rose-400/30 text-rose-100 text-sm rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <button
              onClick={() => setShowDecline(true)}
              className="text-sm text-slate-300 hover:text-rose-300 px-3 py-2"
            >
              Decline to sign
            </button>
            <button
              onClick={onSign}
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-100 px-5 py-2.5 rounded-xl text-sm font-medium disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing…
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Sign & Return Document
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {showDecline && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-navy-900 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white">Decline signature?</h3>
            <p className="mt-1 text-sm text-slate-300">
              Optionally let the originating team know why.
            </p>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              rows={3}
              className="mt-3 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none"
              placeholder="Reason (optional)"
            />
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowDecline(false)}
                className="text-sm text-slate-300 px-3 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDecline(false);
                  onDecline();
                }}
                className="inline-flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-100 px-4 py-2 rounded-xl text-sm"
              >
                <XCircle className="w-4 h-4" /> Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 flex items-start gap-2">
      <Icon className="w-4 h-4 text-slate-400 mt-0.5" />
      <div className="min-w-0">
        <div className="text-[11px] text-slate-400">{label}</div>
        <div className="text-sm text-white truncate">{value}</div>
      </div>
    </div>
  );
}
