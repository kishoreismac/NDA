"use client";
import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import { GlassCard } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { rules as initialRules } from "@/lib/mockData";
import { exportToCsv } from "@/lib/csvExport";
import { logAuditEvent } from "@/lib/auditTrail";
import { Plus, GitBranch, Sparkles, Download, X, Trash2 } from "lucide-react";

export default function RulesPage() {
  const toast = useToast();
  const [rules, setRules] = useState(initialRules);
  const [showNew, setShowNew] = useState(false);

  const toggle = (id) => {
    let next = rules;
    setRules((arr) => {
      next = arr.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
      return next;
    });
    const r = rules.find((x) => x.id === id);
    if (r) {
      const enabled = !r.enabled;
      logAuditEvent({
        action: enabled ? "Rule enabled" : "Rule disabled",
        target: r.name,
      });
      toast.info(enabled ? "Rule enabled" : "Rule disabled", r.name);
    }
  };

  const onExport = () => {
    exportToCsv({
      filename: "NDAFlow_Rules",
      columns: [
        { key: "id", label: "Rule ID" },
        { key: "name", label: "Name" },
        { key: "when", label: "When" },
        { key: "action", label: "Then" },
        {
          key: "enabled",
          label: "Enabled",
          accessor: (r) => (r.enabled ? "Yes" : "No"),
        },
      ],
      rows: rules,
    });
    toast.success("Rules exported", `${rules.length} rule(s) downloaded as CSV.`);
  };

  const onAdd = (rule) => {
    setRules((arr) => [{ ...rule, id: "r" + (arr.length + 1) }, ...arr]);
    logAuditEvent({ action: "Rule created", target: rule.name });
    toast.success("Rule created", rule.name);
    setShowNew(false);
  };

  const onDelete = (id) => {
    const r = rules.find((x) => x.id === id);
    if (!r) return;
    if (!confirm(`Delete rule "${r.name}"?`)) return;
    setRules((arr) => arr.filter((x) => x.id !== id));
    logAuditEvent({ action: "Rule deleted", target: r.name });
    toast.error("Rule deleted", r.name);
  };

  return (
    <>
      <Topbar
        title="Auto-Assignment & Routing Rules"
        subtitle="Conditional rules that route NDAs based on type, risk, party and data signals."
        actions={
          <div className="flex items-center gap-2">
            <button data-testid="rules-export-csv" onClick={onExport} className="btn-ghost">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button data-testid="add-rule-open" onClick={() => setShowNew(true)} className="btn-primary">
              <Plus className="w-4 h-4" /> New Rule
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {rules.map((r) => (
            <GlassCard key={r.id} className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-grad-soft border border-white/10 grid place-items-center">
                  <GitBranch className="w-5 h-5 text-cyanglow" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-semibold text-white">{r.name}</div>
                    <button
                      onClick={() => onDelete(r.id)}
                      className="btn-ghost !py-1 !px-2 text-xs text-rose-300 hover:!text-rose-200"
                      title="Delete rule"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3 text-sm">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        When
                      </div>
                      <div className="text-slate-200 font-mono text-xs">{r.when}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        Then
                      </div>
                      <div className="text-slate-200 text-xs">{r.action}</div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggle(r.id)}
                className={`relative w-11 h-6 rounded-full transition shrink-0 ${
                  r.enabled ? "bg-grad-primary" : "bg-white/10 border border-white/10"
                }`}
                title={r.enabled ? "Disable rule" : "Enable rule"}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    r.enabled ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </GlassCard>
          ))}
        </div>

        <GlassCard>
          <div className="flex items-center gap-2 text-sm font-semibold gradient-text mb-3">
            <Sparkles className="w-4 h-4" /> AI Rule Suggestions
          </div>
          <ul className="space-y-3 text-sm">
            <SuggestionItem
              name="Defense industry → CISO + CLO"
              detail="Detected 3 NDAs this quarter without security review."
              when="Industry = Defense"
              then="Add CISO + CLO as approvers"
              onAccept={onAdd}
            />
            <SuggestionItem
              name="Biotech + sample sharing → MTA template"
              detail="Pattern observed in 4 recent records."
              when="Industry = Biotech AND Sample sharing = Yes"
              then="Suggest MTA template"
              onAccept={onAdd}
            />
            <SuggestionItem
              name="Renewals 60 days before expiry"
              detail="12 active NDAs expiring in next 90 days."
              when="Days to expiry <= 60"
              then="Create Renewal Reminder task"
              onAccept={onAdd}
            />
          </ul>
        </GlassCard>
      </div>

      {showNew && <NewRuleModal onClose={() => setShowNew(false)} onSave={onAdd} />}
    </>
  );
}

function SuggestionItem({ name, detail, when, then, onAccept }) {
  return (
    <li className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
      <div className="font-medium">{name}</div>
      <div className="text-xs text-slate-400 mt-1">{detail}</div>
      <button
        onClick={() => onAccept({ name, when, action: then, enabled: true })}
        className="mt-2 text-xs text-cyanglow hover:underline"
      >
        Create rule →
      </button>
    </li>
  );
}

function NewRuleModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    when: "",
    action: "",
    enabled: true,
  });
  const submit = () => {
    if (!form.name.trim() || !form.when.trim() || !form.action.trim()) return;
    onSave(form);
  };
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-navy-950 border border-white/10 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-white">New Routing Rule</div>
          <button onClick={onClose} className="btn-ghost text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="label">Rule name *</label>
            <input
              data-testid="rule-name"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="High-risk vendor escalation"
            />
          </div>
          <div>
            <label className="label">When (condition) *</label>
            <input
              data-testid="rule-condition"
              className="input"
              value={form.when}
              onChange={(e) => setForm({ ...form, when: e.target.value })}
              placeholder="Type = Vendor AND Risk = High"
            />
          </div>
          <div>
            <label className="label">Then (action) *</label>
            <input
              data-testid="rule-action"
              className="input"
              value={form.action}
              onChange={(e) => setForm({ ...form, action: e.target.value })}
              placeholder="Assign to Senior Counsel + CISO"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
            />
            Enable immediately
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button data-testid="add-rule-submit" onClick={submit} className="btn-primary">
            <Plus className="w-4 h-4" /> Create Rule
          </button>
        </div>
      </div>
    </div>
  );
}
