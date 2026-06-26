// @ts-nocheck
"use client";
import Topbar from "@/components/Topbar";
import { GlassCard, RiskBadge } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { counterparties } from "@/lib/mockData";
import { exportToCsv } from "@/lib/csvExport";
import {
  UserPlus,
  Search,
  Building2,
  Globe2,
  Briefcase,
  Download,
  X,
  Plus,
  Eye,
  FilePlus2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentRole } from "@/lib/permissions";
import { logAuditEvent } from "@/lib/auditTrail";

function trustScore(p) {
  const seed = (p.name || "").length + (p.contracts || 0) * 7;
  return 60 + (seed % 36);
}

export default function PartiesPage() {
  const router = useRouter();
  const { role } = useCurrentRole();
  const toast = useToast();
  const [q, setQ] = useState("");
  const [parties, setParties] = useState(counterparties);
  const [showAdd, setShowAdd] = useState(false);
  const [profileId, setProfileId] = useState(null);

  const list = useMemo(
    () =>
      parties.filter((c) =>
        [c.name, c.country, c.industry]
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      ),
    [parties, q]
  );

  const onExport = () => {
    if (list.length === 0) {
      toast.warning("Nothing to export", "Adjust your search.");
      return;
    }
    exportToCsv({
      filename: "NDAFlow_Parties",
      columns: [
        { key: "id", label: "Party ID" },
        { key: "name", label: "Legal Name" },
        { key: "country", label: "Country" },
        { key: "industry", label: "Industry" },
        { key: "risk", label: "Risk" },
        { key: "contracts", label: "NDAs" },
        { key: "trust", label: "Trust %", accessor: (r) => `${trustScore(r)}%` },
      ],
      rows: list,
    });
    toast.success("Parties exported", `${list.length} party record(s) downloaded.`);
  };

  const onAdd = (newParty) => {
    setParties((arr) => [newParty, ...arr]);
    logAuditEvent({
      action: "Counterparty added",
      target: newParty.name,
      recordId: "",
    });
    toast.success("Party added", `${newParty.name} added to directory.`);
    setShowAdd(false);
  };

  const onNewNda = (party) => {
    toast.info("Starting NDA intake", `Pre-filled with ${party.name}.`);
    router.push(`/requests/new?party=${encodeURIComponent(party.id)}`);
  };

  const profile = parties.find((p) => p.id === profileId);

  return (
    <>
      <Topbar
        title="Parties"
        subtitle="Manage counterparties, view their NDA history and risk profile."
        actions={
          <div className="flex items-center gap-2">
            <button data-testid="parties-export-csv" onClick={onExport} className="btn-ghost">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button data-testid="add-party-open" onClick={() => setShowAdd(true)} className="btn-primary">
              <UserPlus className="w-4 h-4" /> Add Party
            </button>
          </div>
        }
      />

      <GlassCard className="mb-6 flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search parties by name, country, industry…"
          className="bg-transparent outline-none text-sm w-full placeholder-slate-500"
        />
        <span className="text-xs text-slate-400">{list.length} parties</span>
      </GlassCard>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((p) => (
          <GlassCard key={p.id} className="glass-hover">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-grad-soft border border-white/10 grid place-items-center">
                  <Building2 className="w-5 h-5 text-cyanglow" />
                </div>
                <div>
                  <div className="font-semibold text-white">{p.name}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <Globe2 className="w-3 h-3" /> {p.country}
                    <span className="opacity-50">·</span>
                    <Briefcase className="w-3 h-3" /> {p.industry}
                  </div>
                </div>
              </div>
              <RiskBadge level={p.risk} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="text-lg font-bold text-white">{p.contracts}</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">NDAs</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="text-lg font-bold text-white">
                  {Math.max(1, Math.floor(p.contracts / 3))}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Active</div>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="text-lg font-bold gradient-text">{trustScore(p)}%</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Trust</div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setProfileId(p.id)}
                className="btn-ghost flex-1 justify-center text-xs"
              >
                <Eye className="w-3 h-3" /> View profile
              </button>
              <button
                onClick={() => onNewNda(p)}
                disabled={role?.id === "exec"}
                className="btn-ghost flex-1 justify-center text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                title={role?.id === "exec" ? "Executive Viewers have read-only access" : "Start a new NDA with this party"}
              >
                <FilePlus2 className="w-3 h-3" /> New NDA
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {showAdd && <AddPartyModal onClose={() => setShowAdd(false)} onSave={onAdd} />}
      {profile && (
        <PartyProfileModal party={profile} onClose={() => setProfileId(null)} />
      )}
    </>
  );
}

function AddPartyModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    country: "",
    industry: "",
    risk: "Low",
  });
  const submit = () => {
    if (!form.name.trim()) return;
    const id = "p" + Math.random().toString(36).slice(2, 7);
    onSave({ id, ...form, contracts: 0 });
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
          <div className="text-lg font-semibold text-white">Add Counterparty</div>
          <button onClick={onClose} className="btn-ghost text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="label">Legal name *</label>
            <input
              data-testid="party-name"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Acme Robotics Inc."
            />
          </div>
          <div>
            <label className="label">Country</label>
            <input
              data-testid="party-country"
              className="input"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Industry</label>
            <input
              data-testid="party-industry"
              className="input"
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Risk</label>
            <select
              data-testid="party-risk"
              className="input"
              value={form.risk}
              onChange={(e) => setForm({ ...form, risk: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button data-testid="add-party-submit" onClick={submit} className="btn-primary">
            <Plus className="w-4 h-4" /> Add Party
          </button>
        </div>
      </div>
    </div>
  );
}

function PartyProfileModal({ party, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-navy-950 border border-white/10 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-lg font-semibold text-white">{party.name}</div>
            <div className="text-xs text-slate-400 mt-1">
              {party.industry} · {party.country}
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <Stat label="NDAs" value={party.contracts} />
          <Stat label="Active" value={Math.max(1, Math.floor(party.contracts / 3))} />
          <Stat label="Trust %" value={`${trustScore(party)}%`} />
        </div>
        <div className="text-xs text-slate-400 leading-relaxed">
          Risk classification:{" "}
          <span className="text-white font-semibold">{party.risk}</span>. Use the{" "}
          <span className="text-cyanglow">New NDA</span> button on the party card to
          start a pre-filled intake.
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-slate-400">{label}</div>
    </div>
  );
}
