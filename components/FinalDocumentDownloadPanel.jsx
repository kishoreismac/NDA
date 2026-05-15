"use client";
import { useState } from "react";
import { GlassCard, RiskBadge } from "@/components/ui";
import TemplatePreview from "@/components/TemplatePreview";
import { useToast } from "@/components/Toast";
import {
  Download,
  FileText,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  X,
  Workflow,
} from "lucide-react";
import {
  generateDocx,
  generatePdf,
  downloadBlob,
  buildDocumentId,
  buildFileName,
} from "@/lib/documentGenerator";
import { logAuditEvent, recordGeneratedDoc } from "@/lib/auditTrail";

// FinalDocumentDownloadPanel
// Used inside the Risk Review step (and reusable elsewhere) to:
//  - Show selected template + risk + workflow + placeholder status
//  - Generate DOCX / PDF directly from the original template
//  - Trigger downloads + audit events
export default function FinalDocumentDownloadPanel({
  template,
  values,
  validation,
  risk,
  workflow,
  recordId = "",
  recordTitle = "",
  onGenerated,
}) {
  const [doc, setDoc] = useState(null); // generated metadata
  const [busy, setBusy] = useState(null); // "docx" | "pdf" | "both"
  const [showPreview, setShowPreview] = useState(false);
  const toast = useToast();

  const ready = validation?.isValid;
  const filledCount = validation?.summary?.filter((s) => s.status === "Ready").length || 0;
  const totalCount = validation?.summary?.length || 0;

  const ensureDoc = () => {
    if (doc) return doc;
    const id = buildDocumentId();
    const meta = {
      id,
      recordId,
      recordTitle,
      templateId: template.id,
      templateName: template.name,
      templateVersion: template.version,
      generatedAt: Date.now(),
      generatedBy: "Sara Patel",
      counterparty: values.CounterpartyName,
      placeholders: totalCount,
      placeholdersFilled: filledCount,
    };
    setDoc(meta);
    recordGeneratedDoc(meta);
    logAuditEvent({
      action: "Final NDA generated",
      target: `${template.name} ${template.version} → ${id}`,
      recordId,
    });
    onGenerated?.(meta);
    return meta;
  };

  const handleDocx = async () => {
    if (!ready) {
      toast.warning("Cannot download yet", "Fix missing placeholders first.");
      return;
    }
    setBusy("docx");
    try {
      const meta = ensureDoc();
      const blob = await generateDocx({ template, values, meta });
      const base = buildFileName({ counterparty: values.CounterpartyName });
      const filename = `${base}_${safeName(template.name)}.docx`;
      const ok = await downloadBlob(blob, filename);
      if (!ok) throw new Error("Browser blocked the download.");
      logAuditEvent({ action: "DOCX downloaded", target: filename, recordId });
      toast.success("DOCX downloaded", filename);
    } catch (err) {
      console.error(err);
      toast.error("DOCX download failed", err?.message || "Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const handlePdf = async () => {
    if (!ready) {
      toast.warning("Cannot download yet", "Fix missing placeholders first.");
      return;
    }
    setBusy("pdf");
    try {
      const meta = ensureDoc();
      const blob = await generatePdf({ template, values, meta });
      const base = buildFileName({ counterparty: values.CounterpartyName });
      const filename = `${base}_${safeName(template.name)}.pdf`;
      const ok = await downloadBlob(blob, filename);
      if (!ok) throw new Error("Browser blocked the download.");
      logAuditEvent({ action: "PDF downloaded", target: filename, recordId });
      toast.success("PDF downloaded", filename);
    } catch (err) {
      console.error(err);
      toast.error("PDF download failed", err?.message || "Please try again.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <GlassCard className="!p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-grad-soft">
        <div>
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyanglow" /> Final NDA Document
          </div>
          <div className="text-xs text-slate-300 mt-0.5">
            Generated from the original selected template — no AI rewriting.
          </div>
        </div>
        {risk && <RiskBadge level={risk.level} />}
      </div>

      <div className="p-5 grid sm:grid-cols-2 gap-4">
        <Field label="Selected template" value={template?.name || "—"} />
        <Field label="Template version" value={template?.version || "—"} />
        <Field
          label="Approval workflow"
          value={
            workflow ? (
              <span className="inline-flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-violet-300" />
                {workflow.length} steps
              </span>
            ) : (
              "—"
            )
          }
        />
        <Field
          label="Placeholder completion"
          value={
            <span
              className={
                ready ? "text-emerald-300 font-semibold" : "text-amber-300 font-semibold"
              }
            >
              {filledCount}/{totalCount} populated
            </span>
          }
        />
        <Field
          label="Final document status"
          value={
            doc ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Generated · {doc.id}
              </span>
            ) : ready ? (
              <span className="text-slate-300">Ready to generate</span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5" />
                Missing placeholder values
              </span>
            )
          }
        />
        <Field
          label="Counterparty"
          value={values.CounterpartyName || <span className="text-slate-500 italic">—</span>}
        />
      </div>

      <div className="px-5 pb-5 flex flex-wrap items-center gap-2">
        <button
          onClick={handleDocx}
          disabled={!ready || busy}
          className="btn-primary disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {busy === "docx" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Download DOCX
        </button>
        <button
          onClick={handlePdf}
          disabled={!ready || busy}
          className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {busy === "pdf" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Download PDF
        </button>
        <button
          onClick={() => setShowPreview(true)}
          disabled={!template}
          className="btn-ghost disabled:opacity-40"
        >
          <Eye className="w-4 h-4" /> Preview Final NDA
        </button>
        {!ready && (
          <span className="text-xs text-amber-300 ml-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Fix missing placeholders to enable downloads.
          </span>
        )}
      </div>

      {showPreview && (
        <PreviewModal
          onClose={() => {
            setShowPreview(false);
          }}
          template={template}
          values={values}
        />
      )}
    </GlassCard>
  );
}

function Field({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
      <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{label}</div>
      <div className="text-sm text-white">{value}</div>
    </div>
  );
}

function PreviewModal({ template, values, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3 text-white">
          <div className="font-semibold">Final NDA Preview</div>
          <button onClick={onClose} className="btn-ghost">
            <X className="w-4 h-4" /> Close
          </button>
        </div>
        <div className="overflow-auto">
          <TemplatePreview template={template} values={values} mode="filled" />
        </div>
      </div>
    </div>
  );
}

function safeName(s = "") {
  return s.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
}
