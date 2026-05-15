"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard, SectionTitle, StatCard, RiskBadge, StatusBadge } from "@/components/ui";
import { VolumeChart, RiskPie, CycleTimeChart } from "@/components/Charts";
import {
  recentRequests,
  pendingApprovals,
  awaitingSignature,
  priorityRequests,
  openCollaborations,
} from "@/lib/mockData";
import {
  getRequests,
  getStatusCounts,
  getTaskCounts,
  getHighRiskCount,
  getTasks,
} from "@/lib/requestStore";
import {
  FilePlus2,
  FileSignature,
  ShieldAlert,
  Timer,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  MessagesSquare,
  Clock,
  ListChecks,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveRequests = useMemo(() => (mounted ? getRequests() : []), [
    mounted,
    refreshKey,
  ]);
  const statusCounts = useMemo(
    () => (mounted ? getStatusCounts() : {}),
    [mounted, refreshKey]
  );
  const taskCounts = useMemo(
    () => (mounted ? getTaskCounts() : { total: 0, open: 0, overdue: 0, completed: 0 }),
    [mounted, refreshKey]
  );
  const highRisk = mounted ? getHighRiskCount() : 0;
  const tasks = useMemo(() => (mounted ? getTasks() : []), [mounted, refreshKey]);

  const activeCount =
    (statusCounts["Submitted"] || 0) +
    (statusCounts["In Review"] || 0) +
    (statusCounts["Legal Review"] || 0) +
    (statusCounts["Privacy Review"] || 0) +
    (statusCounts["Approved"] || 0) +
    (statusCounts["Awaiting Signature"] || 0);

  const signedCount = statusCounts["Signed"] || 0;
  const draftCount = statusCounts["Draft"] || 0;
  const totalCount = liveRequests.length || 247;
  const autoApprovedPct =
    totalCount > 0 ? Math.round(((signedCount + (statusCounts["Approved"] || 0)) / totalCount) * 100) : 63;

  // Sort live requests by updated desc + merge with mock for fuller display
  const recent = useMemo(() => {
    const live = [...liveRequests].sort(
      (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
    );
    const liveIds = new Set(live.map((r) => r.id));
    const fallback = recentRequests.filter((r) => !liveIds.has(r.id));
    return [...live, ...fallback].slice(0, 8);
  }, [liveRequests]);

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Welcome back, Sara. Here's what's happening across your NDA portfolio today."
        actions={
          <Link href="/requests/new" className="btn-primary">
            <FilePlus2 className="w-4 h-4" /> New NDA Request
          </Link>
        }
      />

      {/* Metric strip — live */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Active NDAs"
          value={mounted ? activeCount : "—"}
          delta={`${draftCount} drafts`}
          icon={FileSignature}
          accent="indigo"
        />
        <StatCard
          label="High-risk in flight"
          value={mounted ? highRisk : "—"}
          delta={`${statusCounts["Legal Review"] || 0} in legal review`}
          icon={ShieldAlert}
          accent="pink"
        />
        <StatCard
          label="Open tasks"
          value={mounted ? taskCounts.open : "—"}
          delta={`${taskCounts.overdue} overdue`}
          icon={ListChecks}
          accent="cyan"
        />
        <StatCard
          label="Signed / Approved"
          value={mounted ? signedCount + (statusCounts["Approved"] || 0) : "—"}
          delta={`${autoApprovedPct}% completion rate`}
          icon={TrendingUp}
          accent="emerald"
        />
      </div>

      {/* Status breakdown strip */}
      <GlassCard className="mb-6">
        <SectionTitle title="NDA status pipeline" subtitle="Live counts across the workflow" />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { k: "Draft", color: "bg-slate-500/15 text-slate-300" },
            { k: "Submitted", color: "bg-cyan-500/15 text-cyan-300" },
            { k: "Legal Review", color: "bg-violet-500/15 text-violet-300" },
            { k: "Privacy Review", color: "bg-fuchsia-500/15 text-fuchsia-300" },
            { k: "Approved", color: "bg-emerald-500/15 text-emerald-300" },
            { k: "Awaiting Signature", color: "bg-amber-500/15 text-amber-300" },
            { k: "Signed", color: "bg-emerald-600/15 text-emerald-200" },
            { k: "In Review", color: "bg-cyan-500/15 text-cyan-300" },
            { k: "Rejected", color: "bg-rose-500/15 text-rose-300" },
            { k: "Cancelled", color: "bg-slate-500/15 text-slate-300" },
          ].map((s) => (
            <div
              key={s.k}
              className={`p-3 rounded-xl border border-white/5 ${s.color}`}
            >
              <div className="text-2xl font-bold">{statusCounts[s.k] || 0}</div>
              <div className="text-[10px] uppercase tracking-wider opacity-80">
                {s.k}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Volume chart */}
        <GlassCard className="xl:col-span-2">
          <SectionTitle
            title="NDA volume — created vs signed"
            subtitle="Last 7 months"
            action={<span className="chip">+24% YoY</span>}
          />
          <VolumeChart />
        </GlassCard>

        {/* Risk pie */}
        <GlassCard>
          <SectionTitle title="Risk distribution" subtitle="In-flight requests" />
          <RiskPie />
        </GlassCard>

        {/* Recent requests — live */}
        <GlassCard className="xl:col-span-2">
          <SectionTitle
            title="Recent requests"
            subtitle="Latest NDA activity (live)"
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
                  <th className="px-2 py-2 font-medium">Type</th>
                  <th className="px-2 py-2 font-medium">Risk</th>
                  <th className="px-2 py-2 font-medium">Status</th>
                  <th className="px-2 py-2 font-medium">Owner</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr
                    key={r.id}
                    className="table-row cursor-pointer"
                    onClick={() => router.push(`/repository?open=${encodeURIComponent(r.id)}`)}
                  >
                    <td className="px-2 py-3 font-mono text-xs text-slate-300">{r.id}</td>
                    <td className="px-2 py-3 font-medium text-white">{r.title}</td>
                    <td className="px-2 py-3 text-slate-300">{r.type}</td>
                    <td className="px-2 py-3">
                      <RiskBadge level={r.risk} />
                    </td>
                    <td className="px-2 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-2 py-3 text-slate-300">{r.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Cycle time */}
        <GlassCard>
          <SectionTitle title="Cycle time by NDA type" subtitle="Average days end-to-end" />
          <CycleTimeChart />
        </GlassCard>

        {/* Tasks summary — live */}
        <GlassCard>
          <SectionTitle
            title="My open tasks"
            subtitle="Action items for you"
            action={
              <Link href="/tasks" className="text-xs text-cyanglow hover:underline">
                Open Tasks →
              </Link>
            }
          />
          <ul className="space-y-3">
            {tasks
              .filter((t) => t.status === "Open" || t.status === "In Progress" || t.status === "Overdue")
              .slice(0, 5)
              .map((t) => (
                <li
                  key={t.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-white truncate">
                      {t.type} · {t.requestId}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">
                      {t.requestTitle} · {t.assignedTo}
                    </div>
                  </div>
                  <span
                    className={`chip ${
                      t.status === "Overdue"
                        ? "!text-rose-300 !border-rose-400/30 !bg-rose-500/10"
                        : ""
                    }`}
                  >
                    <Clock className="w-3 h-3" /> {t.status}
                  </span>
                </li>
              ))}
            {tasks.filter((t) => t.status !== "Completed" && t.status !== "Rejected").length === 0 && (
              <li className="text-xs text-slate-400 p-3 text-center">
                No open tasks. 🎉
              </li>
            )}
          </ul>
        </GlassCard>

        {/* Pending approvals */}
        <GlassCard>
          <SectionTitle
            title="Pending approvals"
            subtitle="Awaiting your action"
            action={
              <span className="chip">
                <CheckCircle2 className="w-3 h-3" /> {pendingApprovals.length}
              </span>
            }
          />
          <ul className="space-y-3">
            {pendingApprovals.map((p) => (
              <li
                key={p.id}
                className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <div>
                  <div className="font-medium text-sm text-white">{p.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    <span className="font-mono">{p.id}</span> · {p.approver}
                  </div>
                </div>
                <span
                  className={`chip ${
                    p.sla.includes("Overdue")
                      ? "!text-rose-300 !border-rose-400/30 !bg-rose-500/10"
                      : ""
                  }`}
                >
                  <Clock className="w-3 h-3" /> {p.sla}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Awaiting signature */}
        <GlassCard>
          <SectionTitle title="Awaiting signature" subtitle="Sent to counterparty" />
          <ul className="space-y-3">
            {awaitingSignature.map((a) => (
              <li
                key={a.id}
                className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <div>
                  <div className="font-medium text-sm text-white">{a.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{a.party}</div>
                </div>
                <span className="chip">
                  <FileSignature className="w-3 h-3" /> {a.sentAt}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Priority requests */}
        <GlassCard>
          <SectionTitle title="Priority requests" subtitle="Auto-flagged by NDAFlow AI" />
          <ul className="space-y-3">
            {priorityRequests.map((p) => (
              <li
                key={p.id}
                className="p-3 rounded-xl bg-rose-500/[0.06] border border-rose-400/20"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm text-white">{p.title}</div>
                  <RiskBadge level={p.risk} />
                </div>
                <div className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 text-rose-400" /> {p.reason}
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>

        {/* Open collaborations */}
        <GlassCard>
          <SectionTitle title="Open collaborations" subtitle="Active redline threads" />
          <ul className="space-y-3">
            {openCollaborations.map((c) => (
              <li
                key={c.id}
                className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <div>
                  <div className="font-medium text-sm text-white">{c.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                    <MessagesSquare className="w-3 h-3" /> {c.with}
                  </div>
                </div>
                {c.unread > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-grad-primary">
                    {c.unread}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </>
  );
}
