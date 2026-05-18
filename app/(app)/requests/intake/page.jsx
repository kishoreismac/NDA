"use client";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard, RiskBadge } from "@/components/ui";
import TemplatePreview from "@/components/TemplatePreview";
import PlaceholderValidationPanel from "@/components/PlaceholderValidationPanel";
import FinalDocumentDownloadPanel from "@/components/FinalDocumentDownloadPanel";
import {
  riskQuestions,
  computeRisk,
  recommendWorkflow,
  recommendClauses,
  aiExplanation,
} from "@/lib/riskEngine";
import { counterparties, ndaTypes, recentRequests } from "@/lib/mockData";
import {
  TEMPLATE_LIBRARY,
  getTemplateById,
  defaultTemplateForType,
} from "@/lib/templates";
import {
  buildPlaceholderValues,
  buildMappingSummary,
  validatePlaceholders,
} from "@/lib/placeholders";
import { logAuditEvent } from "@/lib/auditTrail";
import { useToast } from "@/components/Toast";
import {
  upsertRequest,
  setRequestStatus,
  createTasksForSubmission,
  createTask,
  getRequest,
  hydrateFormFromRecord,
} from "@/lib/requestStore";
import { AUTO_ASSIGNMENT_RULES } from "@/lib/autoAssignmentRules";
import { useCurrentRole, ACTIONS } from "@/lib/permissions";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  FileText,
  Settings2,
  HelpCircle,
  Shield,
  Gauge,
  FileSignature,
  AlertTriangle,
  Workflow,
  ListChecks,
  Eye,
  CheckCircle2,
  GitBranch,
  ShieldAlert,
} from "lucide-react";

const STEPS = [
  { id: 1, key: "counterparty", title: "Counterparty Details", icon: Building2 },
  { id: 2, key: "record", title: "Record Details", icon: FileText },
  { id: 3, key: "template", title: "Template & Placeholders", icon: Settings2 },
  { id: 4, key: "questions", title: "Additional NDA Questions", icon: HelpCircle },
  { id: 5, key: "pii", title: "PII / Data Questions", icon: Shield },
  { id: 6, key: "risk", title: "Risk Review", icon: Gauge },
  { id: 7, key: "draft", title: "Generate Final NDA", icon: FileSignature },
];

const additionalQuestions = riskQuestions.filter((q) =>
  ["competitor", "ma", "international", "newIp", "similarProducts", "thirdParty", "pricingStrategy"].includes(q.id)
);
const piiQuestions = riskQuestions.filter((q) =>
  ["pii", "employeeData", "customerData", "largeData", "crossBorder"].includes(q.id)
);

function Stepper({ current, onJump }) {
  return (
    <div className="glass p-4 mb-6 overflow-x-auto">
      <ol className="flex items-center gap-1 min-w-max">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = current > s.id;
          const active = current === s.id;
          return (
            <li key={s.id} className="flex items-center">
              <button
                type="button"
                onClick={() => onJump?.(s.id)}
                title={`Go to ${s.title}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition cursor-pointer hover:border-white/30 hover:text-white ${
                  active
                    ? "bg-grad-soft border-white/15 text-white shadow-glow"
                    : done
                    ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
                    : "bg-white/5 border-white/10 text-slate-400"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg grid place-items-center text-[11px] font-bold ${
                    active ? "bg-grad-primary text-white" : done ? "bg-emerald-500/20" : "bg-white/10"
                  }`}
                >
                  {done ? <Check className="w-3.5 h-3.5" /> : s.id}
                </span>
                <Icon className="w-4 h-4 opacity-80" />
                <span className="hidden md:inline whitespace-nowrap">{s.title}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`w-6 h-px mx-1 ${done ? "bg-emerald-400/40" : "bg-white/10"}`} />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition ${
        checked ? "bg-grad-primary" : "bg-white/10 border border-white/10"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

function QuestionList({ questions, answers, setAnswers }) {
  return (
    <ul className="space-y-3">
      {questions.map((q) => (
        <li
          key={q.id}
          className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5"
        >
          <div>
            <div className="text-sm font-medium text-white">{q.label}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 mt-1">
              {q.category} · weight {q.weight}
            </div>
          </div>
          <Toggle
            checked={!!answers[q.id]}
            onChange={(v) => setAnswers({ ...answers, [q.id]: v })}
          />
        </li>
      ))}
    </ul>
  );
}

function IntakeInner() {
  const params = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const { guard, can, role } = useCurrentRole();
  const editId = params.get("edit");
  const renewId = params.get("renew");
  const existingId = editId || renewId;
  const isEditMode = Boolean(editId);
  const isRenewMode = Boolean(renewId);
  const ndaTypeId = params.get("type") || "mutual";
  const initialTemplateId = params.get("template");
  const ndaType = ndaTypes.find((t) => t.id === ndaTypeId) || ndaTypes[0];

  const [step, setStep] = useState(1);
  const [templateSubStep, setTemplateSubStep] = useState("select"); // "select" | "preview"
  const [recordId] = useState(
    () => existingId || "NDA-" + (2042 + Math.floor(Math.random() * 50))
  );

  const initialTemplate =
    (initialTemplateId && getTemplateById(initialTemplateId)) ||
    defaultTemplateForType(ndaTypeId);

  const [form, setForm] = useState({
    // Counterparty
    counterpartyId: "",
    counterpartyName: "",
    counterpartyAddress: "",
    counterpartyContact: "",
    counterpartyEmail: "",
    counterpartyCountry: "",
    counterpartySignerName: "",
    counterpartySignerTitle: "Authorized Signatory",
    // Company
    companyName: "Contoso Corporation",
    companyAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
    companySignerName: "Sara Patel",
    companySignerTitle: "VP, Legal",
    // Employee (for employee NDAs)
    employeeName: "",
    // Record
    recordTitle: "",
    recordOwner: "Sara Patel",
    businessUnit: "Corporate Development",
    purpose: "",
    confidentialInformation: "",
    effectiveDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    term: "two (2) years",
    survival: "three (3) years",
    // Template
    templateId: initialTemplate?.id || "tpl-standard",
    jurisdiction: "Delaware, USA",
    governingLaw: "Delaware, USA",
    direction: ndaTypeId.includes("incoming")
      ? "incoming"
      : ndaTypeId.includes("outgoing")
      ? "outgoing"
      : "mutual",
    type: ndaTypeId,
  });
  const [answers, setAnswers] = useState({});
  const [previewMode, setPreviewMode] = useState("raw"); // raw | filled
  const [hasLoggedSelection, setHasLoggedSelection] = useState(false);

  // Load existing record into form when in edit/renew mode
  useEffect(() => {
    if (!existingId) return;
    // Try store first, then fall back to mock recentRequests so any record
    // visible in the Repository can be edited/renewed without starting blank.
    const rec =
      getRequest(existingId) ||
      recentRequests.find((r) => r.id === existingId) ||
      null;
    if (!rec) {
      toast.warning(
        "Record not found",
        `${existingId} could not be loaded. Starting from a blank form.`
      );
      return;
    }
    const hydrated = hydrateFormFromRecord(rec);
    setForm((prev) => ({ ...prev, ...hydrated }));
    if (rec.answers) setAnswers(rec.answers);
    if (isRenewMode) {
      toast.info(
        "Renewal mode",
        `Reviewing ${existingId}. Update term and effective date, then re-submit.`
      );
      setStep(2); // jump to record details (term + effective date)
    } else {
      toast.info(
        "Editing record",
        `${existingId} loaded with all details prefilled. Make changes and re-submit.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingId]);

  const template = useMemo(
    () => getTemplateById(form.templateId) || initialTemplate,
    [form.templateId, initialTemplate]
  );
  const values = useMemo(() => buildPlaceholderValues(form), [form]);
  const summary = useMemo(
    () => buildMappingSummary(template, values),
    [template, values]
  );
  const validation = useMemo(
    () => validatePlaceholders(template, values),
    [template, values]
  );

  const risk = useMemo(() => computeRisk(answers), [answers]);
  const workflow = useMemo(() => recommendWorkflow(risk.level, answers), [risk.level, answers]);
  const clauses = useMemo(() => recommendClauses(answers, risk.level), [answers, risk.level]);
  const explanation = useMemo(
    () => aiExplanation(risk.score, risk.level, risk.flags, answers),
    [risk, answers]
  );

  // Audit: log template selection once on mount if from query, and whenever template changes by user.
  useEffect(() => {
    if (!template || hasLoggedSelection) return;
    logAuditEvent({
      action: "Template selected",
      target: `${template.name} ${template.version}`,
      recordId,
    });
    setHasLoggedSelection(true);
  }, [template, hasLoggedSelection, recordId]);

  const next = () => setStep((s) => Math.min(7, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  if (role?.id === "exec") {
    return (
      <>
        <Topbar
          title="Guided Intake"
          subtitle="Executive Viewer accounts are read-only."
        />
        <GlassCard className="max-w-2xl text-center py-10">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/15 border border-amber-400/30 grid place-items-center mb-4">
            <ShieldAlert className="w-6 h-6 text-amber-300" />
          </div>
          <h3 className="text-lg font-semibold text-white">Access restricted</h3>
          <p className="text-sm text-slate-300 mt-2">
            Executive Viewers cannot create or edit NDA requests. Switch to a
            Business User, Legal Reviewer or Admin account to use the guided
            intake.
          </p>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="btn-primary mt-5"
          >
            Back to Dashboard
          </button>
        </GlassCard>
      </>
    );
  }

  const onPickCounterparty = (id) => {
    const cp = counterparties.find((c) => c.id === id);
    if (cp)
      setForm((f) => ({
        ...f,
        counterpartyId: cp.id,
        counterpartyName: cp.name,
        counterpartyCountry: cp.country,
      }));
  };

  const onChooseTemplate = (id) => {
    const t = getTemplateById(id);
    setForm((f) => ({ ...f, templateId: id }));
    if (t) {
      logAuditEvent({
        action: "Template changed",
        target: `${t.name} ${t.version}`,
        recordId,
      });
    }
  };

  // When entering risk-review step, log validation result.
  useEffect(() => {
    if (step === 6) {
      const ready = summary.filter((s) => s.status === "Ready").length;
      logAuditEvent({
        action: "Placeholder values validated",
        target: `${ready}/${summary.length} ready${
          validation.isValid ? "" : ` · ${validation.missingRequired.length} missing required`
        }`,
        recordId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <>
      <Topbar
        title={
          isRenewMode
            ? `Renew NDA — ${recordId}`
            : isEditMode
            ? `Edit NDA — ${recordId}`
            : `Guided Intake — ${ndaType.name}`
        }
        subtitle={
          isRenewMode
            ? "Review the existing agreement and update the term, effective date, or any other details before re-submitting."
            : isEditMode
            ? "Update the full NDA details (counterparty, parties, terms, template) and re-submit for legal review."
            : "NDAFlow AI computes risk and routes the request. Final NDA is generated from the original template — no AI rewriting of legal content."
        }
        actions={
          <button onClick={() => router.push("/requests/new")} className="btn-ghost">
            <ChevronLeft className="w-4 h-4" /> Change type
          </button>
        }
      />

      {(isEditMode || isRenewMode) && (
        <div
          className={`mb-4 rounded-xl border px-4 py-3 text-sm flex items-center gap-3 ${
            isRenewMode
              ? "bg-amber-500/10 border-amber-400/30 text-amber-100"
              : "bg-indigo-500/10 border-indigo-400/30 text-indigo-100"
          }`}
        >
          <span className="font-semibold">
            {isRenewMode ? "Renewal mode" : "Edit mode"}:
          </span>
          <span className="opacity-90">
            {isRenewMode
              ? `You are renewing ${recordId}. Update the term and effective date below, then re-submit.`
              : `You are editing ${recordId}. Make your changes across any step and re-submit.`}
          </span>
        </div>
      )}

      <Stepper current={step} onJump={(id) => setStep(id)} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* STEP 1 — Counterparty */}
          {step === 1 && (
            <GlassCard>
              <h3 className="font-semibold text-white text-lg mb-4">Counterparty Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="label">Pick from existing parties</label>
                  <select
                    className="input"
                    value={form.counterpartyId}
                    onChange={(e) => onPickCounterparty(e.target.value)}
                  >
                    <option value="">— New counterparty —</option>
                    {counterparties.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.country})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Legal name</label>
                  <input
                    className="input"
                    placeholder="Acme Robotics Inc."
                    value={form.counterpartyName}
                    onChange={(e) => setForm({ ...form, counterpartyName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Country</label>
                  <input
                    className="input"
                    value={form.counterpartyCountry}
                    onChange={(e) => setForm({ ...form, counterpartyCountry: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Registered address</label>
                  <input
                    className="input"
                    placeholder="500 Industrial Way, San Jose, CA 95110, USA"
                    value={form.counterpartyAddress}
                    onChange={(e) => setForm({ ...form, counterpartyAddress: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Primary contact</label>
                  <input
                    className="input"
                    placeholder="Jane Doe, General Counsel"
                    value={form.counterpartyContact}
                    onChange={(e) => setForm({ ...form, counterpartyContact: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Contact email</label>
                  <input
                    className="input"
                    placeholder="jane.doe@acme.com"
                    value={form.counterpartyEmail}
                    onChange={(e) => setForm({ ...form, counterpartyEmail: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Authorized signer name</label>
                  <input
                    className="input"
                    placeholder="Jane Doe"
                    value={form.counterpartySignerName}
                    onChange={(e) =>
                      setForm({ ...form, counterpartySignerName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="label">Authorized signer title</label>
                  <input
                    className="input"
                    placeholder="General Counsel"
                    value={form.counterpartySignerTitle}
                    onChange={(e) =>
                      setForm({ ...form, counterpartySignerTitle: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <h4 className="font-semibold text-white text-sm mb-3">Agreement Period</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="label">Start Date</label>
                    <input
                      type="date"
                      className="input"
                      value={form.effectiveDate}
                      onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <input
                      type="date"
                      className="input"
                      value={form.endDate}
                      min={form.effectiveDate || undefined}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">Term Time</label>
                    <select
                      className="input"
                      value={form.term}
                      onChange={(e) => setForm({ ...form, term: e.target.value })}
                    >
                      <option>one (1) year</option>
                      <option>two (2) years</option>
                      <option>three (3) years</option>
                      <option>five (5) years</option>
                    </select>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* STEP 2 — Record + Company */}
          {step === 2 && (
            <GlassCard>
              <h3 className="font-semibold text-white text-lg mb-4">Record Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="label">Engagement / project title</label>
                  <input
                    className="input"
                    placeholder="Joint R&D — autonomous platform"
                    value={form.recordTitle}
                    onChange={(e) => setForm({ ...form, recordTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Record owner</label>
                  <input
                    className="input"
                    value={form.recordOwner}
                    onChange={(e) => setForm({ ...form, recordOwner: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Business unit</label>
                  <input
                    className="input"
                    value={form.businessUnit}
                    onChange={(e) => setForm({ ...form, businessUnit: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Purpose of disclosure</label>
                  <textarea
                    rows={3}
                    className="input"
                    placeholder="Briefly describe what will be shared and why..."
                    value={form.purpose}
                    onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Confidential information description (optional)</label>
                  <textarea
                    rows={2}
                    className="input"
                    placeholder="Source code, financial models, customer lists, technical specifications…"
                    value={form.confidentialInformation}
                    onChange={(e) =>
                      setForm({ ...form, confidentialInformation: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="label">Effective date (Start)</label>
                  <input
                    type="date"
                    className="input"
                    value={form.effectiveDate}
                    onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">End date</label>
                  <input
                    type="date"
                    className="input"
                    value={form.endDate}
                    min={form.effectiveDate || undefined}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Term</label>
                  <select
                    className="input"
                    value={form.term}
                    onChange={(e) => setForm({ ...form, term: e.target.value })}
                  >
                    <option>one (1) year</option>
                    <option>two (2) years</option>
                    <option>three (3) years</option>
                    <option>five (5) years</option>
                  </select>
                </div>
                <div>
                  <label className="label">Survival period</label>
                  <select
                    className="input"
                    value={form.survival}
                    onChange={(e) => setForm({ ...form, survival: e.target.value })}
                  >
                    <option>two (2) years</option>
                    <option>three (3) years</option>
                    <option>five (5) years</option>
                    <option>perpetual</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <h4 className="font-semibold text-white text-sm mb-3">Company / Disclosing Party</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Company name</label>
                    <input
                      className="input"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">Company address</label>
                    <input
                      className="input"
                      value={form.companyAddress}
                      onChange={(e) => setForm({ ...form, companyAddress: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">Authorized signer (Company)</label>
                    <input
                      className="input"
                      value={form.companySignerName}
                      onChange={(e) =>
                        setForm({ ...form, companySignerName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="label">Signer title (Company)</label>
                    <input
                      className="input"
                      value={form.companySignerTitle}
                      onChange={(e) =>
                        setForm({ ...form, companySignerTitle: e.target.value })
                      }
                    />
                  </div>
                  {form.templateId === "tpl-employee" && (
                    <div className="sm:col-span-2">
                      <label className="label">Employee / Contractor name</label>
                      <input
                        className="input"
                        placeholder="John Smith"
                        value={form.employeeName}
                        onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          )}

          {/* STEP 3 — Template & Placeholders */}
          {step === 3 && (
            <div className="space-y-5">
              <GlassCard>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">Select NDA Template</h3>
                  <span className="text-xs text-slate-400">
                    {TEMPLATE_LIBRARY.length} approved templates
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {TEMPLATE_LIBRARY.map((t) => {
                    const selected = form.templateId === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => onChooseTemplate(t.id)}
                        className={
                          "text-left p-3 rounded-xl border transition " +
                          (selected
                            ? "bg-grad-soft border-indigoglow/40 shadow-glow"
                            : "bg-white/[0.03] border-white/10 hover:border-white/20")
                        }
                      >
                        <div className="flex items-start justify-between">
                          <div className="text-sm font-semibold text-white">{t.name}</div>
                          {selected && <CheckCircle2 className="w-4 h-4 text-cyanglow" />}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {t.type} · {t.version} · {t.jurisdiction}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          {t.placeholders.length} placeholders
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/10">
                  <div>
                    <label className="label">Governing law</label>
                    <select
                      className="input"
                      value={form.governingLaw}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          governingLaw: e.target.value,
                          jurisdiction: e.target.value,
                        })
                      }
                    >
                      <option>Delaware, USA</option>
                      <option>New York, USA</option>
                      <option>California, USA</option>
                      <option>England & Wales</option>
                      <option>Singapore</option>
                      <option>Germany</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Jurisdiction</label>
                    <input
                      className="input"
                      value={form.jurisdiction}
                      onChange={(e) =>
                        setForm({ ...form, jurisdiction: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Preview toggle (Continue lives in the bottom nav) */}
                <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-400">
                    {templateSubStep === "select"
                      ? "Optionally review the template preview and placeholders before continuing."
                      : "Preview shown below. Use Continue at the bottom when you're ready."}
                  </div>
                  {templateSubStep === "select" ? (
                    <button
                      type="button"
                      onClick={() => setTemplateSubStep("preview")}
                      className="btn-ghost"
                    >
                      <Eye className="w-4 h-4" /> View Preview & Placeholders
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setTemplateSubStep("select")}
                      className="btn-ghost"
                    >
                      Hide Preview
                    </button>
                  )}
                </div>
              </GlassCard>

              {templateSubStep === "preview" && (
                <>
                  <GlassCard className="!p-0 overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Template Preview — {template?.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Detected placeholders are highlighted. Switch view to see filled-in values.
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        {[
                          ["raw", "Raw"],
                          ["filled", "Filled"],
                        ].map(([k, label]) => (
                          <button
                            key={k}
                            onClick={() => setPreviewMode(k)}
                            className={
                              "px-2.5 py-1 rounded-md border transition " +
                              (previewMode === k
                                ? "bg-indigoglow/20 border-indigoglow/40 text-white"
                                : "bg-white/5 border-white/10 text-slate-300 hover:text-white")
                            }
                          >
                            <Eye className="w-3 h-3 inline mr-1" />
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-5">
                      <TemplatePreview
                        template={template}
                        values={values}
                        mode={previewMode}
                      />
                    </div>
                  </GlassCard>

                  <PlaceholderValidationPanel
                    summary={summary}
                    missingRequired={validation.missingRequired}
                  />
                </>
              )}
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <GlassCard>
              <h3 className="font-semibold text-white text-lg mb-2">Additional NDA Questions</h3>
              <p className="text-sm text-slate-400 mb-5">
                Toggle any that apply. NDAFlow AI uses these to weight strategic and IP risk.
              </p>
              <QuestionList
                questions={additionalQuestions}
                answers={answers}
                setAnswers={setAnswers}
              />
            </GlassCard>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <GlassCard>
              <h3 className="font-semibold text-white text-lg mb-2">PII / Data Questions</h3>
              <p className="text-sm text-slate-400 mb-5">
                Required for privacy and data residency assessment.
              </p>
              <QuestionList questions={piiQuestions} answers={answers} setAnswers={setAnswers} />
            </GlassCard>
          )}

          {/* STEP 6 — Risk Review */}
          {step === 6 && (
            <div className="space-y-6">
              <GlassCard>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-cyanglow" /> Auto-Assignment & Routing Rules
                  </h3>
                  <span className="chip">
                    {AUTO_ASSIGNMENT_RULES.filter((r) => r.enabled).length} active
                  </span>
                </div>
                <div className="text-xs text-slate-400 mb-3">
                  These organisational rules will be applied automatically to this request based on the answers captured above.
                </div>
                <div className="overflow-x-auto -mx-1">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[10px] uppercase tracking-wider text-slate-400 border-b border-white/5">
                        <th className="px-2 py-2 font-medium">Rule Name</th>
                        <th className="px-2 py-2 font-medium">Target Field</th>
                        <th className="px-2 py-2 font-medium">When</th>
                        <th className="px-2 py-2 font-medium">Then</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AUTO_ASSIGNMENT_RULES.filter((r) => r.enabled).map((r) => (
                        <tr key={r.id} className="border-b border-white/5 align-top">
                          <td className="px-2 py-2.5 font-semibold text-white">{r.name}</td>
                          <td className="px-2 py-2.5 text-cyanglow text-xs">{r.targetField}</td>
                          <td className="px-2 py-2.5 text-slate-300 text-xs">{r.when}</td>
                          <td className="px-2 py-2.5 text-slate-200 text-xs">{r.then}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">Risk Review</h3>
                  <RiskBadge level={risk.level} />
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs uppercase text-slate-400 tracking-wider">Risk score</div>
                    <div className="text-3xl font-bold mt-1.5 gradient-text">{risk.score}/100</div>
                    <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-grad-primary"
                        style={{ width: `${risk.score}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs uppercase text-slate-400 tracking-wider">Risk flags</div>
                    <div className="text-3xl font-bold mt-1.5">{risk.flags.length}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      across {Object.keys(risk.categories).length} categories
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs uppercase text-slate-400 tracking-wider">Selected template</div>
                    <div className="text-sm font-semibold mt-1.5">{template?.name}</div>
                    <div className="text-[11px] text-slate-400">{template?.version}</div>
                  </div>
                </div>

                {risk.flags.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" /> Risk flags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {risk.flags.map((f) => (
                        <span
                          key={f.id}
                          className="px-2.5 py-1.5 rounded-lg text-xs bg-rose-500/10 text-rose-200 border border-rose-400/20"
                        >
                          {f.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6 p-4 rounded-xl bg-grad-soft border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-sm font-semibold gradient-text">
                    <Sparkles className="w-4 h-4" /> NDAFlow AI risk explanation
                  </div>
                  <p
                    className="text-sm text-slate-200 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: explanation.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-cyanglow" /> Recommended approval workflow
                  </h4>
                  <ol className="space-y-2">
                    {workflow.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                      >
                        <span className="w-6 h-6 rounded-lg bg-grad-primary grid place-items-center text-[11px] font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-violet-300" /> Clause recommendations
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {clauses.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
                      >
                        <span className="text-sm">{c.name}</span>
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                            c.strength === "Strict"
                              ? "bg-rose-500/15 text-rose-300"
                              : c.strength === "Required"
                              ? "bg-amber-500/15 text-amber-300"
                              : "bg-white/10 text-slate-300"
                          }`}
                        >
                          {c.strength}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              <FinalDocumentDownloadPanel
                template={template}
                values={values}
                validation={validation}
                risk={risk}
                workflow={workflow}
                recordId={recordId}
                recordTitle={
                  form.recordTitle || `${form.counterpartyName || "New record"}`
                }
              />
            </div>
          )}

          {/* STEP 7 — Generate Final NDA */}
          {step === 7 && (
            <div className="space-y-6">
              <GlassCard>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-lg">Final NDA Document</h3>
                  <RiskBadge level={risk.level} />
                </div>
                <p className="text-sm text-slate-400 mb-5">
                  This document is generated directly from{" "}
                  <span className="text-white font-medium">{template?.name}</span> with
                  placeholder substitution only. No AI rewriting of legal content has been
                  performed.
                </p>

                {!validation.isValid && (
                  <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-sm flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Required placeholders are missing</div>
                      <div className="text-xs mt-1 text-amber-100/90">
                        Go back to Step 3 to populate:{" "}
                        {validation.missingRequired
                          .map((m) => `{{${m.key}}}`)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                )}

                <TemplatePreview
                  template={template}
                  values={values}
                  mode="filled"
                />
              </GlassCard>

              <FinalDocumentDownloadPanel
                template={template}
                values={values}
                validation={validation}
                risk={risk}
                workflow={workflow}
                recordId={recordId}
                recordTitle={
                  form.recordTitle || `${form.counterpartyName || "New record"}`
                }
              />

              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="btn-primary"
                  disabled={!validation.isValid}
                  onClick={() => {
                    if (guard(ACTIONS.SUBMIT, toast)) return;
                    if (!validation.isValid) {
                      toast.warning(
                        "Cannot submit",
                        `Fix ${validation.missingRequired.length} required placeholder(s) first.`
                      );
                      return;
                    }
                    const req = upsertRequest({
                      id: recordId,
                      title: form.recordTitle || `${form.counterpartyName || "New record"}`,
                      recordType: "Non-Disclosure Agreement (NDA)",
                      type: ndaType.name,
                      risk: risk.level,
                      riskScore: risk.score,
                      status: "In Review",
                      owner: form.recordOwner || "Sara Patel",
                      counterparty: form.counterpartyName,
                      templateId: template.id,
                      workflowSteps: workflow.length,
                      form,
                      answers,
                    });
                    const nextStatus = "In Review";
                    setRequestStatus(req.id, nextStatus);
                    const tasks = createTasksForSubmission(
                      { ...req, status: nextStatus },
                      answers
                    );
                    logAuditEvent({
                      action: isRenewMode
                        ? "Renewal submitted"
                        : isEditMode
                        ? "Updated and resubmitted"
                        : "Submitted for legal review",
                      target: template.name,
                      recordId,
                    });
                    toast.success(
                      isRenewMode
                        ? "Renewal submitted"
                        : isEditMode
                        ? "Updated & resubmitted"
                        : "Submitted for legal review",
                      `${recordId} → ${nextStatus} · ${tasks.length} task(s) created`
                    );
                    setTimeout(() => router.push("/legal-queue"), 600);
                  }}
                >
                  Submit for legal review
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    upsertRequest({
                      id: recordId,
                      title:
                        form.recordTitle || `${form.counterpartyName || "Draft NDA"}`,
                      recordType: "Non-Disclosure Agreement (NDA)",
                      type: ndaType.name,
                      risk: risk.level,
                      riskScore: risk.score,
                      status: "Draft",
                      owner: form.recordOwner || "Sara Patel",
                      counterparty: form.counterpartyName,
                      templateId: template.id,
                      workflowSteps: workflow.length,
                      form,
                      answers,
                    });
                    logAuditEvent({
                      action: "Saved as draft",
                      target: template.name,
                      recordId,
                    });
                    toast.success(
                      "Draft saved successfully",
                      `${recordId} is now in My Requests / Repository.`
                    );
                  }}
                >
                  Save as draft
                </button>
                <button
                  className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={(() => {
                    const r = getRequest(recordId);
                    return !r || r.status !== "Approved";
                  })()}
                  title={
                    (() => {
                      const r = getRequest(recordId);
                      return r?.status === "Approved"
                        ? "Send for signature"
                        : "Available after legal approval";
                    })()
                  }
                  onClick={() => {
                    const r = getRequest(recordId);
                    if (!r || r.status !== "Approved") {
                      toast.warning(
                        "Not ready for signature",
                        "Send for Sign is enabled only after legal approval."
                      );
                      return;
                    }
                    setRequestStatus(recordId, "Awaiting Signature");
                    createTask({
                      requestId: recordId,
                      requestTitle: r.title,
                      type: "Signature",
                      assignedTo: form.counterpartySignerName || "Counterparty Signer",
                      priority: "High",
                      dueDate: Date.now() + 5 * 24 * 60 * 60 * 1000,
                    });
                    logAuditEvent({
                      action: "Sent for signature",
                      target: template.name,
                      recordId,
                    });
                    toast.success(
                      "Sent for signature",
                      "Signature task created. Status → Awaiting Signature."
                    );
                  }}
                >
                  Send for signature
                </button>
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between">
            <button onClick={back} disabled={step === 1} className="btn-ghost disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < 7 && (
              <button onClick={next} className="btn-primary">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live AI side panel */}
        <aside className="space-y-6">
          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold gradient-text">
                <Sparkles className="w-4 h-4" /> AI Live Risk
              </div>
              <RiskBadge level={risk.level} />
            </div>
            <div className="text-4xl font-bold gradient-text">
              {risk.score}
              <span className="text-lg text-slate-400">/100</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-grad-primary transition-all"
                style={{ width: `${risk.score}%` }}
              />
            </div>
            <div className="mt-4 text-xs text-slate-400 leading-relaxed">
              Score updates live as you answer the intake questions.
            </div>
          </GlassCard>

          <GlassCard>
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyanglow" /> Selected template
            </div>
            <div className="text-sm font-semibold text-white">{template?.name}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {template?.type} · {template?.version}
            </div>
            <div className="mt-3 space-y-1 text-xs text-slate-400">
              <div>Jurisdiction: {form.jurisdiction}</div>
              <div>Direction: {form.direction}</div>
              <div>Term: {form.term}</div>
            </div>
            <div
              className={
                "mt-3 px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 " +
                (validation.isValid
                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                  : "bg-amber-500/15 text-amber-300 border border-amber-400/30")
              }
            >
              {validation.isValid ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> All placeholders ready
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {validation.missingRequired.length} required missing
                </>
              )}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Workflow className="w-4 h-4 text-violet-300" /> Workflow ({workflow.length} steps)
            </div>
            <ol className="space-y-1.5">
              {workflow.map((s, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-4 h-4 rounded grid place-items-center bg-white/10 text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </GlassCard>

          <GlassCard>
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Risk flags ({risk.flags.length})
            </div>
            {risk.flags.length === 0 ? (
              <div className="text-xs text-slate-400">No flags raised yet.</div>
            ) : (
              <ul className="space-y-1.5 max-h-48 overflow-auto">
                {risk.flags.map((f) => (
                  <li
                    key={f.id}
                    className="text-xs text-rose-200 bg-rose-500/10 border border-rose-400/20 rounded-lg px-2 py-1.5"
                  >
                    {f.label}
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>
        </aside>
      </div>
    </>
  );
}

export default function IntakePage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400">Loading intake…</div>}>
      <IntakeInner />
    </Suspense>
  );
}
