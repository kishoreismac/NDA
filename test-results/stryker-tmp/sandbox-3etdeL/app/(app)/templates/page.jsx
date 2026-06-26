// @ts-nocheck
"use client";
import { useEffect, useMemo, useState } from "react";
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
  Trash2,
} from "lucide-react";
import { TEMPLATE_LIBRARY, PLACEHOLDER_DEFS } from "@/lib/templates";
import {
  buildPlaceholderValues,
  buildMappingSummary,
  validatePlaceholders,
} from "@/lib/placeholders";
import { logAuditEvent } from "@/lib/auditTrail";
import { useCurrentRole } from "@/lib/permissions";
import { useToast } from "@/components/Toast";
import {
  buildTemplateFromText,
  deleteCustomTemplate,
  getCustomTemplates,
  refreshCustomTemplates,
  saveCustomTemplate,
} from "@/lib/customTemplates";

export default function TemplatesPage() {
  const router = useRouter();
  const toast = useToast();
  const { role } = useCurrentRole();
  const isAdmin = role?.id === "admin";

  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [previewId, setPreviewId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [customs, setCustoms] = useState([]);

  // Hydrate cache then refresh from server
  useEffect(() => {
    setCustoms(getCustomTemplates());
    refreshCustomTemplates().then((list) => setCustoms(list));
  }, []);

  const allTemplates = useMemo(
    () => [...TEMPLATE_LIBRARY, ...customs],
    [customs]
  );

  const types = useMemo(
    () => ["All", ...Array.from(new Set(allTemplates.map((t) => t.type)))],
    [allTemplates]
  );

  const filtered = allTemplates.filter((t) => {
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

  const handleSaveNew = async (entry) => {
    try {
      await saveCustomTemplate(entry);
      const list = await refreshCustomTemplates();
      setCustoms(list);
      logAuditEvent({
        action: "Template created",
        target: `${entry.name} ${entry.version}`,
      });
      toast.success("Template saved", `${entry.name} is now available in the library.`);
      setShowCreate(false);
    } catch (e) {
      toast.error("Save failed", e?.message || "Could not save template.");
    }
  };

  const handleDelete = async (t) => {
    if (!confirm(`Delete template "${t.name}"? This cannot be undone.`)) return;
    try {
      await deleteCustomTemplate(t.id);
      const list = await refreshCustomTemplates();
      setCustoms(list);
      logAuditEvent({ action: "Template deleted", target: `${t.name} ${t.version}` });
      toast.success("Template deleted", t.name);
    } catch (e) {
      toast.error("Delete failed", e?.message);
    }
  };

  const previewTpl = allTemplates.find((t) => t.id === previewId);

  return (
    <>
      <Topbar
        title="NDA Template Library"
        subtitle="Approved NDA templates. Final documents are generated from these originals — never rewritten by AI."
        actions={
          isAdmin ? (
            <button className="btn-primary" onClick={() => setShowCreate(true)}>
              <Plus className="w-4 h-4" /> New Template
            </button>
          ) : null
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
            &nbsp;of {allTemplates.length} templates
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
              <div className="flex items-center gap-1.5">
                {t.custom && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-cyan-500/15 text-cyan-300 border-cyan-500/30">
                    Custom
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-500/15 text-emerald-300 border-emerald-500/30 inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {t.status}
                </span>
              </div>
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
              {isAdmin && t.custom && (
                <button
                  onClick={() => handleDelete(t)}
                  title="Delete custom template"
                  className="px-2 rounded-lg bg-rose-500/10 border border-rose-400/30 text-rose-300 hover:bg-rose-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
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

      {showCreate && (
        <NewTemplateModal
          onClose={() => setShowCreate(false)}
          onSave={handleSaveNew}
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

const DEFAULT_BODY = `# Mutual Non-Disclosure Agreement

This Agreement is made effective as of {{EffectiveDate}} by and between {{CompanyName}}, with offices at {{CompanyAddress}} ("Company"), and {{CounterpartyName}}, with offices at {{CounterpartyAddress}} ("Counterparty").

# 1. Purpose
The parties wish to explore {{BusinessPurpose}} (the "Purpose") and in connection therewith may disclose confidential information to each other.

# 2. Confidential Information
"Confidential Information" includes, without limitation: {{ConfidentialInformation}}.

# 3. Obligations
The Receiving Party shall hold the Confidential Information in strict confidence, use it solely for the Purpose, and protect it with at least reasonable care.

# 4. Term
This Agreement shall remain in effect for {{NDADuration}} from the Effective Date. The confidentiality obligations shall survive for {{SurvivalPeriod}}.

# 5. Governing Law
This Agreement shall be governed by {{GoverningLaw}} and the parties submit to the jurisdiction of {{Jurisdiction}}.
`;

function NewTemplateModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Custom");
  const [jurisdiction, setJurisdiction] = useState("Delaware, USA");
  const [version, setVersion] = useState("v1.0");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState(DEFAULT_BODY);
  const [submitting, setSubmitting] = useState(false);

  // Live placeholder extraction (so admin can confirm tokens used)
  const placeholders = useMemo(() => {
    return Array.from(
      new Set(Array.from(body.matchAll(/\{\{(\w+)\}\}/g)).map((m) => m[1]))
    );
  }, [body]);

  const recognised = placeholders.filter((p) =>
    PLACEHOLDER_DEFS.some((d) => d.key === p)
  );
  const unknown = placeholders.filter(
    (p) => !PLACEHOLDER_DEFS.some((d) => d.key === p)
  );

  const slug = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 32) || "template";

  const submit = async () => {
    if (!name.trim()) {
      alert("Template name is required.");
      return;
    }
    if (!body.trim()) {
      alert("Template body cannot be empty.");
      return;
    }
    setSubmitting(true);
    const id = `tpl-custom-${slug(name)}-${Date.now().toString(36)}`;
    const entry = buildTemplateFromText({
      id,
      name: name.trim(),
      type: type.trim() || "Custom",
      jurisdiction: jurisdiction.trim(),
      version: version.trim() || "v1.0",
      description: description.trim(),
      body,
    });
    await onSave(entry);
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[92vh] glass p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Create New Template</h3>
            <p className="text-xs text-slate-400 mt-1">
              Use <code className="text-cyan-300">{`{{PlaceholderName}}`}</code>{" "}
              tokens. Lines starting with <code className="text-cyan-300">#</code>{" "}
              become headings.
            </p>
          </div>
          <button onClick={onClose} className="btn-ghost text-xs">
            <X className="w-3.5 h-3.5" /> Close
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-5">
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="label">
                  Template name <span className="text-rose-400">*</span>
                </label>
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Channel Partner NDA"
                />
              </div>
              <div>
                <label className="label">Type</label>
                <input
                  className="input"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Mutual / One-Way / Vendor / Custom…"
                />
              </div>
              <div>
                <label className="label">Jurisdiction</label>
                <input
                  className="input"
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                />
              </div>
              <div>
                <label className="label">Version</label>
                <input
                  className="input"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="label">Description</label>
              <input
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary shown on the template card."
              />
            </div>
            <div>
              <label className="label">
                Template body <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={18}
                className="input font-mono text-[12px] leading-5"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <p className="text-[11px] text-slate-500 mt-1">
                A signature block for Company &amp; Counterparty is appended
                automatically.
              </p>
            </div>
          </div>

          <aside className="space-y-3">
            <GlassCard className="!p-4">
              <div className="text-xs font-semibold text-white mb-2">
                Placeholders ({placeholders.length})
              </div>
              {placeholders.length === 0 ? (
                <p className="text-[11px] text-slate-400">
                  No placeholders found. Add tokens like{" "}
                  <code className="text-cyan-300">{`{{CompanyName}}`}</code>.
                </p>
              ) : (
                <div className="space-y-1">
                  {recognised.map((p) => (
                    <div
                      key={p}
                      className="text-[11px] text-emerald-300 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" /> {p}
                    </div>
                  ))}
                  {unknown.map((p) => (
                    <div
                      key={p}
                      className="text-[11px] text-amber-300"
                      title="Not in PLACEHOLDER_DEFS — won't auto-fill from intake form."
                    >
                      ⚠ {p}
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
            <GlassCard className="!p-4">
              <div className="text-xs font-semibold text-white mb-2">
                Standard tokens
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
                {PLACEHOLDER_DEFS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() =>
                      setBody((b) => b + ` {{${p.key}}}`)
                    }
                    className="w-full text-left text-[11px] text-slate-300 hover:text-white px-2 py-1 rounded bg-white/[0.03] hover:bg-white/[0.08] border border-white/5"
                  >
                    <span className="text-cyan-300">{`{{${p.key}}}`}</span>{" "}
                    <span className="text-slate-500">— {p.label}</span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </aside>
        </div>

        <div className="flex items-center justify-end gap-2 mt-5 pt-5 border-t border-white/10">
          <button onClick={onClose} className="btn-ghost text-sm" disabled={submitting}>
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={submitting}
            className="btn-primary text-sm"
          >
            {submitting ? "Saving…" : "Save Template"}
          </button>
        </div>
      </div>
    </div>
  );
}

