"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard } from "@/components/ui";
import TemplatePreview from "@/components/TemplatePreview";
import PlaceholderValidationPanel from "@/components/PlaceholderValidationPanel";
import {
  Plus,
  FileText,
  Calendar,
  Globe2,
  Layers,
  Eye,
  ArrowRight,
  X,
  Search,
  CheckCircle2,
} from "lucide-react";
import { TEMPLATE_LIBRARY } from "@/lib/templates";
import {
  buildPlaceholderValues,
  buildMappingSummary,
  validatePlaceholders,
} from "@/lib/placeholders";
import { logAuditEvent } from "@/lib/auditTrail";

export default function TemplatesPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [previewId, setPreviewId] = useState(null);

  const types = useMemo(
    () => ["All", ...Array.from(new Set(TEMPLATE_LIBRARY.map((t) => t.type)))],
    []
  );

  const filtered = TEMPLATE_LIBRARY.filter((t) => {
    if (typeFilter !== "All" && t.type !== typeFilter) return false;
    if (!q) return true;
    const s = q.toLowerCase();
    return [t.name, t.type, t.jurisdiction, t.description]
      .join(" ")
      .toLowerCase()
      .includes(s);
  });

  const handlePreview = (t) => {
    setPreviewId(t.id);
    logAuditEvent({ action: "Template previewed", target: `${t.name} ${t.version}` });
  };

  const handleUse = (t) => {
    logAuditEvent({ action: "Template selected", target: `${t.name} ${t.version}` });
    router.push(`/requests/intake?type=mutual&template=${t.id}`);
  };

  const previewTpl = TEMPLATE_LIBRARY.find((t) => t.id === previewId);

  return (
    <>
      <Topbar
        title="NDA Template Library"
        subtitle="Approved NDA templates. Final documents are generated from these originals — never rewritten by AI."
        actions={
          <button className="btn-primary">
            <Plus className="w-4 h-4" /> New Template
          </button>
        }
      />

      <GlassCard className="mb-6">
        <div className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, type, jurisdiction…"
              className="bg-transparent outline-none text-sm w-full placeholder-slate-500"
            />
          </div>
          <select
            className="input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <div className="text-xs text-slate-400 flex items-center justify-end">
            <span className="text-white font-semibold">{filtered.length}</span>
            &nbsp;of {TEMPLATE_LIBRARY.length} templates
          </div>
        </div>
      </GlassCard>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <GlassCard key={t.id} className="glass-hover relative overflow-hidden flex flex-col">
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-grad-primary opacity-10 blur-2xl" />
            <div className="relative flex items-start justify-between">
              <div className="w-11 h-11 rounded-xl bg-grad-soft border border-white/10 grid place-items-center">
                <FileText className="w-5 h-5 text-cyanglow" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-500/15 text-emerald-300 border-emerald-500/30 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {t.status}
              </span>
            </div>
            <div className="relative mt-4">
              <div className="font-semibold text-white">{t.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {t.type} · {t.version}
              </div>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">{t.description}</p>
            </div>
            <div className="relative mt-5 grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center gap-1">
                <Globe2 className="w-3 h-3 text-slate-400" />
                <span className="font-medium text-white text-center text-[11px]">
                  {t.jurisdiction}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center gap-1">
                <Layers className="w-3 h-3 text-slate-400" />
                <span className="font-medium text-white">
                  {t.placeholders.length} fields
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span className="font-medium text-white text-[11px]">{t.updated}</span>
              </div>
            </div>
            <div className="relative flex gap-2 mt-4">
              <button
                onClick={() => handlePreview(t)}
                className="btn-ghost flex-1 justify-center text-xs"
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button
                onClick={() => handleUse(t)}
                className="btn-primary flex-1 justify-center text-xs"
              >
                Use Template <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {previewTpl && (
        <TemplatePreviewModal
          template={previewTpl}
          onClose={() => setPreviewId(null)}
          onUse={() => {
            handleUse(previewTpl);
            setPreviewId(null);
          }}
        />
      )}
    </>
  );
}

function TemplatePreviewModal({ template, onClose, onUse }) {
  const values = buildPlaceholderValues({});
  const summary = buildMappingSummary(template, values);
  const validation = validatePlaceholders(template, values);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3 text-white">
          <div>
            <div className="font-semibold">{template.name}</div>
            <div className="text-xs text-slate-400 mt-0.5">
              {template.type} · {template.version} · {template.jurisdiction}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onUse} className="btn-primary text-xs">
              Use Template <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button onClick={onClose} className="btn-ghost text-xs">
              <X className="w-3.5 h-3.5" /> Close
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 overflow-auto">
          <div className="lg:col-span-2">
            <TemplatePreview template={template} mode="raw" />
          </div>
          <div>
            <PlaceholderValidationPanel
              summary={summary}
              missingRequired={validation.missingRequired}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
