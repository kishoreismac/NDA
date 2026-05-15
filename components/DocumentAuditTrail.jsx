"use client";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui";
import { History, Filter } from "lucide-react";
import { getAuditLog, formatTimestamp } from "@/lib/auditTrail";

// DocumentAuditTrail
// Reusable audit log display. Pass `recordId` to filter to a single NDA record,
// or omit it to show all events.
export default function DocumentAuditTrail({
  recordId,
  title = "Audit Trail",
  limit = 50,
  compact = false,
  refreshKey = 0,
}) {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all"); // all | template | document

  useEffect(() => {
    const all = getAuditLog();
    setEntries(all);
  }, [refreshKey, recordId]);

  const filtered = entries
    .filter((e) => (recordId ? e.recordId === recordId : true))
    .filter((e) => {
      if (filter === "all") return true;
      if (filter === "template")
        return /template|placeholder|preview/i.test(e.action);
      if (filter === "document")
        return /generated|downloaded|document|repository/i.test(e.action);
      return true;
    })
    .slice(0, limit);

  return (
    <GlassCard className="!p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="text-sm font-semibold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-cyanglow" /> {title}
        </div>
        {!compact && (
          <div className="flex items-center gap-1.5 text-[11px]">
            <Filter className="w-3 h-3 text-slate-400" />
            {[
              ["all", "All"],
              ["template", "Template"],
              ["document", "Document"],
            ].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={
                  "px-2 py-1 rounded-md border transition " +
                  (filter === k
                    ? "bg-indigoglow/20 border-indigoglow/40 text-white"
                    : "bg-white/5 border-white/10 text-slate-300 hover:text-white")
                }
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-white/[0.03]">
            <tr>
              <th className="text-left px-4 py-2.5">Timestamp</th>
              <th className="text-left px-4 py-2.5">Actor</th>
              <th className="text-left px-4 py-2.5">Action</th>
              <th className="text-left px-4 py-2.5">Target</th>
              {!recordId && (
                <th className="text-left px-4 py-2.5">Record</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={recordId ? 4 : 5}
                  className="px-4 py-8 text-center text-slate-400 text-xs"
                >
                  No audit events recorded yet.
                </td>
              </tr>
            )}
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-white/[0.03]">
                <td className="px-4 py-2.5 text-slate-300 whitespace-nowrap text-xs">
                  {formatTimestamp(e.ts)}
                </td>
                <td className="px-4 py-2.5 text-slate-200 whitespace-nowrap">
                  {e.actor}
                </td>
                <td className="px-4 py-2.5 text-white">{e.action}</td>
                <td className="px-4 py-2.5 text-slate-300">{e.target}</td>
                {!recordId && (
                  <td className="px-4 py-2.5 text-cyanglow font-mono text-xs">
                    {e.recordId || "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
