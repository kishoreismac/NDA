"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard, SectionTitle, StatusBadge, RiskBadge } from "@/components/ui";
import {
  getRequests,
  getStatusCounts,
  getRecordTypeCounts,
  getRequestsByStatus,
  getRequestsByRecordType,
  formatExpirationDate,
  isExpiringSoon,
  isExpired,
  RECORD_TYPES,
  STATUSES,
} from "@/lib/requestStore";
import { useCurrentRole } from "@/lib/permissions";
import {
  FilePlus2,
  Database,
  BarChart3,
  RefreshCw,
  X,
  ExternalLink,
  ChevronRight,
  Bot,
} from "lucide-react";

// CTA tiles — "Request a New Contract" routes to a full-page picker.
const CTAS = [
  { href: "/requests/new-contract", label: "Request a New Contract", icon: FilePlus2, gradient: "from-violet-500 to-fuchsia-500" },
  { href: "/repository", label: "Repository", icon: Database, gradient: "from-emerald-500 to-teal-500" },
  { href: "/ai-tools", label: "AI Search", icon: Bot, gradient: "from-cyan-500 to-blue-500" },
  { href: "/reports", label: "Reports", icon: BarChart3, gradient: "from-sky-500 to-cyan-500" },
  { href: "/repository?filter=renewals", label: "Renewals", icon: RefreshCw, gradient: "from-fuchsia-500 to-pink-500" },
];

const PERIODS = ["Current Year", "Last 3 Years", "Last 5 Years"];

// Donut color palette per record type
const TYPE_COLORS = [
  "#22d3ee", // cyan
  "#a855f7", // violet
  "#f59e0b", // amber
  "#10b981", // emerald
  "#ec4899", // pink
  "#3b82f6", // blue
  "#f43f5e", // rose
  "#84cc16", // lime
  "#94a3b8", // slate
];

const STATUS_COLOR = {
  "In Review": { bg: "from-indigo-600/40 to-blue-700/20", dot: "bg-indigo-300", text: "text-indigo-100" },
  Approved: { bg: "from-emerald-600/40 to-emerald-700/20", dot: "bg-emerald-400", text: "text-emerald-200" },
  "Awaiting Signature": { bg: "from-amber-600/40 to-amber-700/20", dot: "bg-amber-400", text: "text-amber-200" },
  Signed: { bg: "from-cyan-700/50 to-teal-700/30", dot: "bg-cyan-300", text: "text-cyan-100" },
  Archived: { bg: "from-slate-600/40 to-slate-700/20", dot: "bg-slate-500", text: "text-slate-300" },
};

export default function DashboardPage() {
  const router = useRouter();
  const { role } = useCurrentRole();
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState("Current Year");
  const [drillStatus, setDrillStatus] = useState(null);
  const [drillType, setDrillType] = useState(null);

  useEffect(() => setMounted(true), []);

  const liveRequests = useMemo(() => (mounted ? getRequests() : []), [mounted]);
  const statusCounts = useMemo(() => (mounted ? getStatusCounts() : {}), [mounted]);
  const recordTypeCounts = useMemo(() => (mounted ? getRecordTypeCounts() : {}), [mounted]);

  const totalRecords = liveRequests.length;
  const activeCount =
    (statusCounts["In Review"] || 0) +
    (statusCounts["Approved"] || 0) +
    (statusCounts["Awaiting Signature"] || 0);

  const summary = [
    {
      label: "Active Requests",
      value: activeCount,
      filter: "status=Active",
    },
    {
      label: "In Review",
      value: statusCounts["In Review"] || 0,
      filter: "status=In%20Review",
    },
    {
      label: "Approved",
      value: statusCounts["Approved"] || 0,
      filter: "status=Approved",
    },
    {
      label: "Awaiting Signature",
      value: statusCounts["Awaiting Signature"] || 0,
      filter: "status=Awaiting%20Signature",
    },
    {
      label: "Signed",
      value: statusCounts["Signed"] || 0,
      filter: "status=Signed",
    },
    {
      label: "Archived",
      value: statusCounts["Archived"] || 0,
      filter: "status=Archived",
    },
  ];

  // record type donut with non-zero entries
  const typeEntries = useMemo(() => {
    const arr = Object.entries(recordTypeCounts).filter(([, v]) => v > 0);
    if (arr.length === 0) {
      return RECORD_TYPES.slice(0, 4).map((t) => [t, 0]);
    }
    return arr;
  }, [recordTypeCounts]);

  return (
    <>
      <Topbar
        title="Contract Management Dashboard"
        subtitle="Welcome back, Sara. Here's the status across all your contract types today."
        actions={
          role?.id !== "exec" ? (
            <Link href="/requests/new-contract" className="btn-primary">
              <span data-testid="topbar-new-contract-action" className="contents">
              <FilePlus2 className="w-4 h-4" /> New Contract Request
              </span>
            </Link>
          ) : null
        }
      />

      {/* Call to Action */}
      <div className="mb-6">
        <div className="text-sm font-semibold text-white mb-3">Call to Action</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CTAS.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                data-testid={`dashboard-cta-${c.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
                key={c.label}
                href={c.href}
                className={`group relative overflow-hidden rounded-2xl p-4 border border-white/10 bg-gradient-to-br ${c.gradient} hover:scale-[1.03] transition shadow-lg`}
              >
                <Icon className="w-5 h-5 text-white mb-2" />
                <div className="text-xs font-semibold text-white leading-tight">
                  {c.label}
                </div>
                <ChevronRight className="absolute top-2 right-2 w-3.5 h-3.5 text-white/70 opacity-0 group-hover:opacity-100 transition" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Summary with period filter */}
      <GlassCard className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm font-semibold text-white">Summary</div>
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-xl p-1">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-[11px] px-3 py-1.5 rounded-lg transition ${
                  period === p
                    ? "bg-grad-primary text-white shadow-glow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {summary.map((s) => (
            <button
              data-testid={`dashboard-status-tab-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
              key={s.label}
              onClick={() =>
                router.push(s.to || `/repository?${s.filter}`)
              }
              className="group flex flex-col items-center text-center hover:scale-[1.04] transition"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 grid place-items-center text-white font-bold text-2xl shadow-glow ring-2 ring-amber-400/20 group-hover:ring-amber-400/60 transition">
                {mounted ? s.value : "—"}
              </div>
              <div className="text-[11px] text-slate-300 mt-2 flex items-center gap-1">
                {s.label}
                {s.info && <span className="text-cyanglow">ⓘ</span>}
              </div>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Record Types + Record Statuses panels */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Record Types */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-white">Record Types</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Application Type: All Contracts
              </div>
            </div>
            <button
              onClick={() => router.push("/repository")}
              className="w-7 h-7 rounded-full bg-grad-primary grid place-items-center text-white text-xs hover:scale-110 transition"
              title="View all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-[180px_1fr] gap-6 items-center">
            <Donut
              entries={typeEntries}
              total={totalRecords}
              colors={TYPE_COLORS}
            />
            <ul className="space-y-2.5">
              {typeEntries.slice(0, 6).map(([name, count], i) => (
                <li key={name}>
                  <button
                    onClick={() => setDrillType(name)}
                    className="w-full flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: TYPE_COLORS[i % TYPE_COLORS.length] }}
                      />
                      <span className="text-xs text-slate-200 truncate group-hover:text-white">
                        {name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white shrink-0">
                      {count}
                    </span>
                  </button>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden mt-1.5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: totalRecords ? `${(count / totalRecords) * 100}%` : "0%",
                        background: TYPE_COLORS[i % TYPE_COLORS.length],
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </GlassCard>

        {/* Record Statuses */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-white">Record Statuses</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Click any status to view documents
              </div>
            </div>
            <button
              onClick={() => router.push("/repository")}
              className="w-7 h-7 rounded-full bg-grad-primary grid place-items-center text-white text-xs hover:scale-110 transition"
              title="View all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {STATUSES.map((s) => {
              const c = STATUS_COLOR[s] || STATUS_COLOR.Draft;
              const count = statusCounts[s] || 0;
              return (
                <button
                  key={s}
                  onClick={() => setDrillStatus(s)}
                  className={`group relative overflow-hidden rounded-xl p-3 text-left border border-white/10 bg-gradient-to-br ${c.bg} hover:border-white/30 transition`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`text-2xl font-bold ${c.text}`}>{count}</div>
                    <span className={`w-2.5 h-2.5 rounded-full ${c.dot} shadow-glow`} />
                  </div>
                  <div className={`text-[10px] uppercase tracking-wider mt-1 ${c.text}`}>
                    {s}
                  </div>
                  <ChevronRight className="absolute bottom-2 right-2 w-3 h-3 text-white/40 opacity-0 group-hover:opacity-100 transition" />
                </button>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Recent contracts */}
      <GlassCard>
        <SectionTitle
          title="Recent contracts"
          subtitle="Latest activity across all record types"
          action={
            <Link href="/repository" className="text-xs text-cyanglow hover:underline">
              View all →
            </Link>
          }
        />
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                <th className="px-2 py-2 font-medium">ID</th>
                <th className="px-2 py-2 font-medium">Title</th>
                <th className="px-2 py-2 font-medium">Record Type</th>
                <th className="px-2 py-2 font-medium">Risk</th>
                <th className="px-2 py-2 font-medium">Status</th>
                <th className="px-2 py-2 font-medium">Owner</th>
                <th className="px-2 py-2 font-medium">Expires</th>
              </tr>
            </thead>
            <tbody>
              {liveRequests.slice(0, 10).map((r) => (
                <tr
                  key={r.id}
                  className="table-row cursor-pointer"
                  onClick={() =>
                    router.push(`/repository?open=${encodeURIComponent(r.id)}`)
                  }
                >
                  <td className="px-2 py-3 font-mono text-xs text-slate-300">{r.id}</td>
                  <td className="px-2 py-3 font-medium text-white">{r.title}</td>
                  <td className="px-2 py-3 text-slate-300 text-xs">
                    {r.recordType || "Non-Disclosure Agreement (NDA)"}
                  </td>
                  <td className="px-2 py-3">
                    <RiskBadge level={r.risk} />
                  </td>
                  <td className="px-2 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-2 py-3 text-slate-300">{r.owner}</td>
                  <td className="px-2 py-3 text-xs">
                    <ExpiresCell record={r} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Drill-down modals */}
      {drillStatus && (
        <DrillModal
          title={`Contracts in "${drillStatus}"`}
          rows={getRequestsByStatus(drillStatus)}
          onClose={() => setDrillStatus(null)}
          onOpen={(id) => {
            setDrillStatus(null);
            router.push(`/repository?open=${encodeURIComponent(id)}`);
          }}
        />
      )}
      {drillType && (
        <DrillModal
          title={drillType}
          rows={getRequestsByRecordType(drillType)}
          onClose={() => setDrillType(null)}
          onOpen={(id) => {
            setDrillType(null);
            router.push(`/repository?open=${encodeURIComponent(id)}`);
          }}
        />
      )}
    </>
  );
}

function ExpiresCell({ record }) {
  const label = formatExpirationDate(record);
  if (label === "—") return <span className="text-slate-500">—</span>;
  const expired = isExpired(record);
  const soon = isExpiringSoon(record, 30);
  const cls = expired
    ? "text-rose-300"
    : soon
    ? "text-amber-300"
    : "text-slate-300";
  return (
    <span className={cls + " whitespace-nowrap"}>
      {label}
      {expired && (
        <span className="ml-1 px-1.5 py-0.5 rounded bg-rose-500/15 border border-rose-400/30 text-[10px] uppercase">
          Expired
        </span>
      )}
      {!expired && soon && (
        <span className="ml-1 px-1.5 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 text-[10px] uppercase">
          Soon
        </span>
      )}
    </span>
  );
}


function Donut({ entries, total, colors }) {
  const size = 168;
  const stroke = 24;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  let offset = 0;
  const safe = total || 1;
  return (
    <div className="relative w-[168px] h-[168px]">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={stroke}
          fill="none"
        />
        {entries.map(([name, v], i) => {
          const len = (v / safe) * C;
          const seg = (
            <circle
              key={name}
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={colors[i % colors.length]}
              strokeWidth={stroke}
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
              fill="none"
              strokeLinecap="butt"
            />
          );
          offset += len;
          return seg;
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{total}</div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Records</div>
        </div>
      </div>
    </div>
  );
}

function DrillModal({ title, rows, onClose, onOpen }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-navy-950 border border-white/10 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-lg font-semibold text-white">{title}</div>
            <div className="text-xs text-slate-400 mt-1">{rows.length} document(s)</div>
          </div>
          <button onClick={onClose} className="btn-ghost text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>
        {rows.length === 0 ? (
          <div className="text-sm text-slate-400 text-center py-10">
            No documents to display.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[60vh]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-2 py-2 font-medium">ID</th>
                  <th className="px-2 py-2 font-medium">Title</th>
                  <th className="px-2 py-2 font-medium">Type</th>
                  <th className="px-2 py-2 font-medium">Risk</th>
                  <th className="px-2 py-2 font-medium">Owner</th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="table-row">
                    <td className="px-2 py-2 font-mono text-xs text-slate-300">{r.id}</td>
                    <td className="px-2 py-2 font-medium text-white">{r.title}</td>
                    <td className="px-2 py-2 text-slate-300 text-xs">
                      {r.recordType || "NDA"}
                    </td>
                    <td className="px-2 py-2">
                      <RiskBadge level={r.risk} />
                    </td>
                    <td className="px-2 py-2 text-slate-300">{r.owner}</td>
                    <td className="px-2 py-2 text-right">
                      <button
                        onClick={() => onOpen(r.id)}
                        className="btn-ghost !py-1 !px-2 text-xs"
                      >
                        Open <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
