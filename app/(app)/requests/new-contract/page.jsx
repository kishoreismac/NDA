"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import { GlassCard } from "@/components/ui";
import { TEMPLATE_LIBRARY } from "@/lib/templates";
import { useCurrentRole } from "@/lib/permissions";
import {
  FileSignature,
  ChevronRight,
  ChevronDown,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";

const QUICK_TEMPLATE_IDS = ["tpl-standard", "tpl-mutual", "tpl-employee"];

export default function RequestNewContractPage() {
  const router = useRouter();
  const { role } = useCurrentRole();
  const [selectedId, setSelectedId] = useState("");

  if (role?.id === "exec") {
    return (
      <>
        <Topbar
          title="Request a New Contract"
          subtitle="Executive Viewer accounts are read-only."
        />
        <GlassCard className="max-w-2xl text-center py-10">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/15 border border-amber-400/30 grid place-items-center mb-4">
            <ShieldAlert className="w-6 h-6 text-amber-300" />
          </div>
          <h3 className="text-lg font-semibold text-white">Access restricted</h3>
          <p className="text-sm text-slate-300 mt-2">
            Executive Viewers have read-only access. Please switch to a Business
            User, Legal Reviewer or Admin account to create a new request.
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

  const quick = QUICK_TEMPLATE_IDS
    .map((id) => TEMPLATE_LIBRARY.find((t) => t.id === id))
    .filter(Boolean);

  const others = useMemo(
    () => TEMPLATE_LIBRARY.filter((t) => !QUICK_TEMPLATE_IDS.includes(t.id)),
    []
  );

  const pick = (templateId) => {
    if (templateId) {
      router.push(`/requests/intake?template=${encodeURIComponent(templateId)}`);
    } else {
      router.push(`/requests/intake?type=mutual`);
    }
  };

  const proceedSelected = () => {
    if (!selectedId) return;
    pick(selectedId);
  };

  return (
    <>
      <Topbar
        title="Request a New Contract"
        subtitle="Pick a quick-start template, choose from the full library, or start a blank request."
        actions={
          <Link href="/dashboard" className="btn-ghost">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        }
      />

      <GlassCard className="mb-6">
        <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-3">
          Quick Templates
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {quick.map((t) => (
            <button
              key={t.id}
              onClick={() => pick(t.id)}
              className="text-left rounded-xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-cyan-600/10 hover:from-indigo-600/30 hover:to-cyan-600/20 p-5 transition"
            >
              <div className="flex items-center gap-2 mb-2">
                <FileSignature className="w-4 h-4 text-cyanglow" />
                <div className="text-sm font-semibold text-white">{t.name}</div>
              </div>
              <div className="text-xs text-slate-300 line-clamp-3 mb-2">
                {t.description}
              </div>
              <div className="text-[10px] text-slate-400">
                {t.type} · {t.version}
              </div>
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="mb-6">
        <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-3">
          Select More Templates
        </div>
        <div className="grid sm:grid-cols-[1fr_auto] gap-3">
          <div className="relative">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="input w-full appearance-none pr-10"
            >
              <option value="">— Choose a template from the full library —</option>
              {others.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} · {t.type} · {t.jurisdiction} · {t.version}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button
            type="button"
            onClick={proceedSelected}
            disabled={!selectedId}
            className="btn-primary disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>

      <GlassCard className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-300">
          Need a custom flow? Start a blank request and pick the template later
          during intake.
        </div>
        <div className="flex items-center gap-3">
          <Link href="/templates" className="text-xs text-cyanglow hover:underline">
            Browse all templates →
          </Link>
          <button onClick={() => pick(null)} className="btn-ghost">
            Start a blank request
          </button>
        </div>
      </GlassCard>
    </>
  );
}
