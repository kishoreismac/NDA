"use client";
import { CheckCircle2, AlertTriangle, Circle } from "lucide-react";

export default function PlaceholderValidationPanel({ summary, missingRequired }) {
  if (!summary?.length) {
    return (
      <div className="text-sm text-slate-400">
        Select a template to see placeholder mappings.
      </div>
    );
  }

  const allReady = !missingRequired || missingRequired.length === 0;

  return (
    <div className="space-y-3">
      <div
        className={`p-3 rounded-xl border text-sm flex items-start gap-2 ${
          allReady
            ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-200"
            : "bg-amber-500/10 border-amber-400/30 text-amber-200"
        }`}
      >
        {allReady ? (
          <CheckCircle2 className="w-4 h-4 mt-0.5" />
        ) : (
          <AlertTriangle className="w-4 h-4 mt-0.5" />
        )}
        <div>
          {allReady ? (
            <>All required placeholders are populated. Document ready to generate.</>
          ) : (
            <>
              <strong>{missingRequired.length}</strong> required placeholder(s)
              missing. Go back and fill these fields before generating the final
              NDA.
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-slate-400">
              <th className="px-2 py-2 font-medium">Placeholder</th>
              <th className="px-2 py-2 font-medium">Source field</th>
              <th className="px-2 py-2 font-medium">Current value</th>
              <th className="px-2 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((s) => {
              const Icon =
                s.status === "Ready"
                  ? CheckCircle2
                  : s.status === "Missing"
                  ? AlertTriangle
                  : Circle;
              const color =
                s.status === "Ready"
                  ? "text-emerald-300"
                  : s.status === "Missing"
                  ? "text-rose-300"
                  : "text-slate-400";
              return (
                <tr key={s.key} className="border-b border-white/5">
                  <td className="px-2 py-2.5 font-mono text-[11px] text-slate-200">{`{{${s.key}}}`}</td>
                  <td className="px-2 py-2.5 text-slate-400 font-mono text-[11px]">{s.source}</td>
                  <td className="px-2 py-2.5 text-slate-300 max-w-xs truncate">
                    {s.value || <span className="text-slate-500 italic">— blank —</span>}
                  </td>
                  <td className="px-2 py-2.5">
                    <span className={`inline-flex items-center gap-1.5 ${color} font-medium`}>
                      <Icon className="w-3.5 h-3.5" />
                      {s.status}
                      {s.required && s.status !== "Ready" && (
                        <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                          required
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
