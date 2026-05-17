"use client";
import { useEffect, useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import { GlassCard, SectionTitle } from "@/components/ui";
import { useToast } from "@/components/Toast";
import {
  getRequests,
  getStatusCounts,
  getRecordTypeCounts,
  getTaskCounts,
  RECORD_TYPES,
  STATUSES,
} from "@/lib/requestStore";
import { exportToCsv } from "@/lib/csvExport";
import { Download, BarChart3, PieChart, FileBarChart } from "lucide-react";

const PERIODS = ["Current Year", "Last 3 Years", "Last 5 Years"];

export default function ReportsPage() {
  const toast = useToast();
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState("Current Year");

  useEffect(() => setMounted(true), []);

  const requests = useMemo(() => (mounted ? getRequests() : []), [mounted]);
  const statusCounts = useMemo(() => (mounted ? getStatusCounts() : {}), [mounted]);
  const typeCounts = useMemo(() => (mounted ? getRecordTypeCounts() : {}), [mounted]);
  const taskCounts = useMemo(
    () => (mounted ? getTaskCounts() : { total: 0, open: 0, overdue: 0, completed: 0 }),
    [mounted]
  );

  const ownerCounts = useMemo(() => {
    const m = {};
    for (const r of requests) m[r.owner] = (m[r.owner] || 0) + 1;
    return m;
  }, [requests]);

  const riskCounts = useMemo(() => {
    const m = { Low: 0, Medium: 0, High: 0 };
    for (const r of requests) m[r.risk] = (m[r.risk] || 0) + 1;
    return m;
  }, [requests]);

  const onExportAll = () => {
    if (requests.length === 0) {
      toast.warning("Nothing to export", "No contract records yet.");
      return;
    }
    exportToCsv({
      filename: `CLM_Report_${period.replace(/\s+/g, "_")}`,
      columns: [
        { key: "id", label: "Record ID" },
        { key: "title", label: "Title" },
        { key: "recordType", label: "Record Type", accessor: (r) => r.recordType || "NDA" },
        { key: "type", label: "Sub-type" },
        { key: "risk", label: "Risk" },
        { key: "status", label: "Status" },
        { key: "owner", label: "Owner" },
        { key: "counterparty", label: "Counterparty" },
        {
          key: "createdAt",
          label: "Created",
          accessor: (r) => (r.createdAt ? new Date(r.createdAt).toISOString() : ""),
        },
        {
          key: "updatedAt",
          label: "Updated",
          accessor: (r) => (r.updatedAt ? new Date(r.updatedAt).toISOString() : ""),
        },
      ],
      rows: requests,
    });
    toast.success("Report exported", `${requests.length} record(s) downloaded.`);
  };

  return (
    <>
      <Topbar
        title="Reports"
        subtitle="Portfolio-wide reporting across all contract types and statuses."
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-xl p-1">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`text-[11px] px-3 py-1.5 rounded-lg ${
                    period === p
                      ? "bg-grad-primary text-white shadow-glow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button onClick={onExportAll} className="btn-primary">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Kpi label="Total Records" value={requests.length} />
        <Kpi label="Open Tasks" value={taskCounts.open} accent="cyan" />
        <Kpi label="Overdue" value={taskCounts.overdue} accent="rose" />
        <Kpi label="Signed" value={statusCounts["Signed"] || 0} accent="emerald" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GlassCard>
          <SectionTitle
            title="Records by Type"
            subtitle="Distribution across all contract types"
            action={<PieChart className="w-4 h-4 text-cyanglow" />}
          />
          <BarList rows={Object.entries(typeCounts)} total={requests.length} color="cyan" />
        </GlassCard>

        <GlassCard>
          <SectionTitle
            title="Records by Status"
            subtitle="Pipeline distribution"
            action={<BarChart3 className="w-4 h-4 text-cyanglow" />}
          />
          <BarList rows={Object.entries(statusCounts)} total={requests.length} color="violet" />
        </GlassCard>

        <GlassCard>
          <SectionTitle
            title="Records by Owner"
            subtitle="Workload distribution"
            action={<FileBarChart className="w-4 h-4 text-cyanglow" />}
          />
          <BarList rows={Object.entries(ownerCounts)} total={requests.length} color="emerald" />
        </GlassCard>

        <GlassCard>
          <SectionTitle
            title="Risk Distribution"
            subtitle="Across in-flight records"
            action={<BarChart3 className="w-4 h-4 text-cyanglow" />}
          />
          <BarList
            rows={Object.entries(riskCounts)}
            total={requests.length}
            color="rose"
          />
        </GlassCard>
      </div>
    </>
  );
}

function Kpi({ label, value, accent = "indigo" }) {
  const grad = {
    indigo: "from-indigo-500/30 to-violet-500/10",
    cyan: "from-cyan-500/30 to-blue-500/10",
    rose: "from-rose-500/30 to-pink-500/10",
    emerald: "from-emerald-500/30 to-teal-500/10",
  }[accent];
  return (
    <div className={`rounded-2xl border border-white/10 p-5 bg-gradient-to-br ${grad}`}>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-300 mt-1">{label}</div>
    </div>
  );
}

function BarList({ rows, total, color }) {
  const filled = rows.filter(([, v]) => v > 0);
  const list = filled.length ? filled : rows;
  const max = Math.max(...list.map(([, v]) => v), 1);
  const colorMap = {
    cyan: "from-cyan-400 to-blue-500",
    violet: "from-violet-400 to-fuchsia-500",
    emerald: "from-emerald-400 to-teal-500",
    rose: "from-rose-400 to-pink-500",
  };
  return (
    <ul className="space-y-3">
      {list.map(([name, v]) => (
        <li key={name}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-200 truncate">{name}</span>
            <span className="font-bold text-white">{v}</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${colorMap[color]}`}
              style={{ width: `${(v / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
