// @ts-nocheck
"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard } from "@/components/ui";
import { useToast } from "@/components/Toast";
import {
  TASK_TYPES,
  TASK_STATUSES,
  getTasks,
  setTaskStatus,
  reassignTask,
  createTask,
} from "@/lib/requestStore";
import { exportToCsv } from "@/lib/csvExport";
import {
  ListChecks,
  Search,
  Filter,
  Download,
  Play,
  CheckCircle2,
  XCircle,
  UserPlus,
  ExternalLink,
  Plus,
  Inbox,
  AlertTriangle,
  Clock,
} from "lucide-react";

const PRIORITIES = ["All", "Critical", "High", "Medium", "Low"];
const ASSIGNEES = [
  "Sara Patel",
  "Jordan Nguyen",
  "Maya Davis",
  "Alex Kim",
  "Elena Park",
  "Privacy Office",
  "Riley Gomez",
];

function priorityChip(p) {
  const map = {
    Critical: "bg-rose-500/15 text-rose-300 border-rose-400/30",
    High: "bg-amber-500/15 text-amber-300 border-amber-400/30",
    Medium: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
    Low: "bg-slate-500/15 text-slate-300 border-slate-400/30",
  };
  return map[p] || map.Medium;
}

function statusChip(s) {
  const map = {
    Open: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
    "In Progress": "bg-violet-500/15 text-violet-300 border-violet-400/30",
    Completed: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    Rejected: "bg-rose-500/15 text-rose-300 border-rose-400/30",
    Cancelled: "bg-slate-500/15 text-slate-300 border-slate-400/30",
    Overdue: "bg-rose-500/20 text-rose-200 border-rose-400/40",
  };
  return map[s] || map.Open;
}

function fmtDate(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function TasksPage() {
  const router = useRouter();
  const toast = useToast();
  const [tasks, setTasks] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("All");
  const [reassigning, setReassigning] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    setTasks(getTasks());
  }, [refreshKey]);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      if (typeFilter !== "All" && t.type !== typeFilter) return false;
      if (priorityFilter !== "All" && t.priority !== priorityFilter) return false;
      if (assigneeFilter !== "All" && t.assignedTo !== assigneeFilter) return false;
      if (q) {
        const s = q.toLowerCase();
        if (
          ![t.id, t.requestId, t.requestTitle, t.assignedTo, t.type]
            .join(" ")
            .toLowerCase()
            .includes(s)
        )
          return false;
      }
      return true;
    });
  }, [tasks, q, statusFilter, typeFilter, priorityFilter, assigneeFilter]);

  const counts = useMemo(() => {
    const total = tasks.length;
    const open = tasks.filter((t) => t.status === "Open" || t.status === "In Progress").length;
    const overdue = tasks.filter((t) => t.status === "Overdue").length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    return { total, open, overdue, completed };
  }, [tasks]);

  const refresh = () => setRefreshKey((k) => k + 1);

  const onStart = (t) => {
    setTaskStatus(t.id, "In Progress");
    toast.success("Task started", `${t.id} is now In Progress.`);
    refresh();
  };
  const onComplete = (t) => {
    setTaskStatus(t.id, "Completed");
    toast.success("Task completed", `${t.id} marked as Completed.`);
    refresh();
  };
  const onReject = (t) => {
    setTaskStatus(t.id, "Rejected", "Rejected from Tasks page");
    toast.error("Task rejected", `${t.id} marked as Rejected.`);
    refresh();
  };
  const onReassignSubmit = (t, person) => {
    if (!person) return;
    reassignTask(t.id, person);
    toast.info("Task reassigned", `${t.id} → ${person}`);
    setReassigning(null);
    refresh();
  };
  const onView = (t) => {
    router.push(`/repository?open=${encodeURIComponent(t.requestId)}`);
  };

  const onExport = () => {
    if (filtered.length === 0) {
      toast.warning("Nothing to export", "Adjust your filters to include rows.");
      return;
    }
    exportToCsv({
      filename: "NDAFlow_Tasks",
      columns: [
        { key: "id", label: "Task ID" },
        { key: "requestId", label: "Related NDA ID" },
        { key: "requestTitle", label: "Related NDA Title" },
        { key: "type", label: "Type" },
        { key: "assignedTo", label: "Assigned To" },
        { key: "priority", label: "Priority" },
        { key: "status", label: "Status" },
        { key: "dueDate", label: "Due Date", accessor: (r) => fmtDate(r.dueDate) },
        { key: "createdAt", label: "Created", accessor: (r) => fmtDate(r.createdAt) },
      ],
      rows: filtered,
    });
    toast.success("Tasks exported", `${filtered.length} task(s) downloaded as CSV.`);
  };

  return (
    <>
      <Topbar
        title="Task Management"
        subtitle="Every action item across the NDA lifecycle. Auto-generated by risk and workflow rules."
        actions={
          <div className="flex items-center gap-2">
            <button onClick={onExport} className="btn-ghost">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button onClick={() => setShowCreate(true)} className="btn-primary">
              <Plus className="w-4 h-4" /> New Task
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricMini label="Total tasks" value={counts.total} icon={ListChecks} accent="cyan" />
        <MetricMini label="Open" value={counts.open} icon={Clock} accent="violet" />
        <MetricMini label="Overdue" value={counts.overdue} icon={AlertTriangle} accent="rose" />
        <MetricMini label="Completed" value={counts.completed} icon={CheckCircle2} accent="emerald" />
      </div>

      <GlassCard className="mb-6">
        <div className="grid md:grid-cols-6 gap-3">
          <div className="md:col-span-2 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search task ID, NDA, assignee…"
              className="bg-transparent outline-none text-sm w-full placeholder-slate-500"
            />
          </div>
          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {["All", ...TASK_STATUSES].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            className="input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {["All", ...TASK_TYPES].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            className="input"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            {PRIORITIES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            className="input"
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
          >
            {["All", ...ASSIGNEES].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="text-xs text-slate-400 mt-3 flex items-center gap-2">
          <Filter className="w-3 h-3" /> Showing{" "}
          <span className="text-white font-semibold">{filtered.length}</span> of {tasks.length}{" "}
          tasks
        </div>
      </GlassCard>

      <GlassCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03]">
              <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3 font-medium">Task ID</th>
                <th className="px-4 py-3 font-medium">NDA</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Assigned To</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="table-row align-top">
                  <td className="px-4 py-3 font-mono text-xs text-slate-300">{t.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-mono text-xs text-cyanglow">{t.requestId}</div>
                    <div className="text-xs text-slate-300 mt-0.5">{t.requestTitle}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-200">{t.type}</td>
                  <td className="px-4 py-3 text-slate-200">{t.assignedTo}</td>
                  <td className="px-4 py-3 text-slate-300">{fmtDate(t.dueDate)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border " +
                        priorityChip(t.priority)
                      }
                    >
                      {t.priority || "Medium"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border " +
                        statusChip(t.status)
                      }
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{fmtDate(t.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      {t.status === "Open" && (
                        <button
                          onClick={() => onStart(t)}
                          className="btn-ghost !py-1 !px-2 text-xs"
                          title="Start task"
                        >
                          <Play className="w-3 h-3" /> Start
                        </button>
                      )}
                      {(t.status === "Open" ||
                        t.status === "In Progress" ||
                        t.status === "Overdue") && (
                        <button
                          onClick={() => onComplete(t)}
                          className="btn-ghost !py-1 !px-2 text-xs text-emerald-300 hover:!text-emerald-200"
                          title="Complete task"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Complete
                        </button>
                      )}
                      {(t.status === "Open" ||
                        t.status === "In Progress" ||
                        t.status === "Overdue") && (
                        <button
                          onClick={() => onReject(t)}
                          className="btn-ghost !py-1 !px-2 text-xs text-rose-300 hover:!text-rose-200"
                          title="Reject task"
                        >
                          <XCircle className="w-3 h-3" /> Reject
                        </button>
                      )}
                      {(t.status === "Open" ||
                        t.status === "In Progress" ||
                        t.status === "Overdue") && (
                        <div className="relative">
                          <button
                            onClick={() => setReassigning(reassigning === t.id ? null : t.id)}
                            className="btn-ghost !py-1 !px-2 text-xs"
                            title="Reassign"
                          >
                            <UserPlus className="w-3 h-3" /> Reassign
                          </button>
                          {reassigning === t.id && (
                            <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-navy-900 border border-white/10 rounded-lg shadow-2xl py-1">
                              {ASSIGNEES.map((p) => (
                                <button
                                  key={p}
                                  onClick={() => onReassignSubmit(t, p)}
                                  className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      <button
                        onClick={() => onView(t)}
                        className="btn-ghost !py-1 !px-2 text-xs"
                        title="View related NDA"
                      >
                        <ExternalLink className="w-3 h-3" /> View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-400">
                    <Inbox className="w-6 h-6 mx-auto mb-2" />
                    No tasks match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {showCreate && (
        <CreateTaskModal
          onClose={() => setShowCreate(false)}
          onCreated={(task) => {
            toast.success("Task created", `${task.id} → ${task.assignedTo}`);
            setShowCreate(false);
            refresh();
          }}
        />
      )}
    </>
  );
}

function MetricMini({ label, value, icon: Icon, accent = "cyan" }) {
  const accents = {
    cyan: "from-cyan-500/20 to-cyan-500/0 text-cyan-300",
    violet: "from-violet-500/20 to-violet-500/0 text-violet-300",
    rose: "from-rose-500/20 to-rose-500/0 text-rose-300",
    emerald: "from-emerald-500/20 to-emerald-500/0 text-emerald-300",
  };
  return (
    <GlassCard className="!p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400">{label}</div>
          <div className="text-3xl font-bold text-white mt-1">{value}</div>
        </div>
        <div
          className={
            "w-10 h-10 rounded-xl bg-gradient-to-br grid place-items-center " +
            accents[accent]
          }
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </GlassCard>
  );
}

function CreateTaskModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    requestId: "",
    requestTitle: "",
    type: TASK_TYPES[0],
    assignedTo: ASSIGNEES[0],
    priority: "Medium",
    dueInDays: 3,
  });

  const submit = () => {
    const dueDate = Date.now() + Number(form.dueInDays) * 24 * 60 * 60 * 1000;
    const t = createTask({
      requestId: form.requestId || "—",
      requestTitle: form.requestTitle || "Ad-hoc task",
      type: form.type,
      assignedTo: form.assignedTo,
      priority: form.priority,
      dueDate,
    });
    onCreated(t);
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
        <div className="text-lg font-semibold text-white mb-4">Create Task</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Related NDA ID</label>
            <input
              className="input"
              placeholder="NDA-2042"
              value={form.requestId}
              onChange={(e) => setForm({ ...form, requestId: e.target.value })}
            />
          </div>
          <div>
            <label className="label">NDA title</label>
            <input
              className="input"
              placeholder="Optional"
              value={form.requestTitle}
              onChange={(e) => setForm({ ...form, requestTitle: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Type</label>
            <select
              className="input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              {TASK_TYPES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Assigned to</label>
            <select
              className="input"
              value={form.assignedTo}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            >
              {ASSIGNEES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Priority</label>
            <select
              className="input"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              {["Critical", "High", "Medium", "Low"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Due in (days)</label>
            <input
              type="number"
              min={0}
              className="input"
              value={form.dueInDays}
              onChange={(e) => setForm({ ...form, dueInDays: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button onClick={submit} className="btn-primary">
            <Plus className="w-4 h-4" /> Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
