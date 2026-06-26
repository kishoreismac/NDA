// @ts-nocheck
"use client";
import Topbar from "@/components/Topbar";
import { GlassCard } from "@/components/ui";
import { ndaTypes } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Clock, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useCurrentRole } from "@/lib/permissions";

export default function NewRequestPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const { role } = useCurrentRole();

  if (role?.id === "exec") {
    return (
      <>
        <Topbar
          title="New NDA Request"
          subtitle="Executive Viewer accounts are read-only."
        />
        <GlassCard className="max-w-2xl text-center py-10">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/15 border border-amber-400/30 grid place-items-center mb-4">
            <ShieldAlert className="w-6 h-6 text-amber-300" />
          </div>
          <h3 className="text-lg font-semibold text-white">Access restricted</h3>
          <p className="text-sm text-slate-300 mt-2">
            Executive Viewers have read-only access. Please switch to a Business
            User, Legal Reviewer or Admin account to create a new NDA request.
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

  const proceed = () => {
    if (!selected) return;
    router.push(`/requests/intake?type=${selected}`);
  };

  return (
    <>
      <Topbar
        title="New NDA Request"
        subtitle="Select the type of NDA you need. NDAFlow AI will tailor the intake questions automatically."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ndaTypes.map((t) => {
          const active = selected === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`text-left glass p-5 glass-hover relative overflow-hidden ${
                active ? "ring-2 ring-indigoglow shadow-glow !bg-white/[0.07]" : ""
              }`}
            >
              {active && (
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-grad-primary opacity-30 blur-2xl" />
              )}
              <div className="relative flex items-start justify-between">
                <div className="text-3xl">{t.icon}</div>
                <span className="chip"><Clock className="w-3 h-3" /> ~{t.avgDays}d</span>
              </div>
              <div className="relative mt-4">
                <div className="font-semibold text-white">{t.name}</div>
                <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">{t.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <GlassCard className="mt-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <Sparkles className="w-4 h-4 text-cyanglow" />
          <span>
            NDAFlow AI will guide you through 7 quick steps and recommend the
            right template, reviewers and clauses.
          </span>
        </div>
        <button
          disabled={!selected}
          onClick={proceed}
          className="btn-primary disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
        >
          Start guided intake <ArrowRight className="w-4 h-4" />
        </button>
      </GlassCard>
    </>
  );
}
