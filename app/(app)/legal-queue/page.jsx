"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard, RiskBadge, StatusBadge } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { recentRequests } from "@/lib/mockData";
import {
  getRequests,
  setRequestStatus,
  createTask,
  upsertRequest,
} from "@/lib/requestStore";
import { exportToCsv } from "@/lib/csvExport";
import { useCurrentRole, ACTIONS } from "@/lib/permissions";
import { sendForSignature } from "@/lib/signatureService";
import SignatureSentModal from "@/components/SignatureSentModal";
import {
  Search,
  Sparkles,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shield,
  Download,
  Eye,
  MoreHorizontal,
  PenTool,
  Pencil,
} from "lucide-react";

const fallbackQueue = [
  ...recentRequests.filter((r) =>
    ["In Review", "Approved", "Awaiting Signature"].includes(r.status)
  ),
  {
    id: "NDA-2033",
    title: "Gringotts Bank — Custody Talks",
    type: "Mutual",
    risk: "High",
    status: "In Review",
    owner: "A. Kim",
    updated: "5h ago",
  },
  {
    id: "NDA-2031",
    title: "Tyrell Corp — Genome Pilot",
    type: "One-Way In",
    risk: "High",
    status: "In Review",
    owner: "J. Nguyen",
    updated: "8h ago",
  },
  {
    id: "NDA-2029",
    title: "Soylent — Supply Discussion",
    type: "Vendor",
    risk: "Medium",
    status: "In Review",
    owner: "M. Davis",
    updated: "1d ago",
  },
];

const REVIEW_STATUSES = ["In Review", "Approved", "Awaiting Signature"];

const tabs = ["All", "Mine", "High risk", "Overdue", "Approved", "Awaiting Signature"];

export default function LegalQueuePage() {
  const router = useRouter();
  const toast = useToast();
  const { guard, can } = useCurrentRole();
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);
  const [sigInfo, setSigInfo] = useState(null);

  const items = useMemo(() => {
    const stored = getRequests().filter((r) => REVIEW_STATUSES.includes(r.status));
    const storedIds = new Set(stored.map((r) => r.id));
    const extras = fallbackQueue.filter((r) => !storedIds.has(r.id));
    return [...stored, ...extras];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  const filtered = useMemo(() => {
    let list = items;
    if (tab === "Mine")
      list = list.filter(
        (i) => (i.owner || "").includes("Sara") || i.owner === "S. Patel"
      );
    if (tab === "High risk") list = list.filter((i) => i.risk === "High");
    if (tab === "Overdue")
      list = list.filter((i) => i.risk === "High");
    if (tab === "Approved")
      list = list.filter((i) => i.status === "Approved");
    if (tab === "Awaiting Signature")
      list = list.filter((i) => i.status === "Awaiting Signature");
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((i) =>
        [i.id, i.title, i.type, i.owner].join(" ").toLowerCase().includes(s)
      );
    }
    return list;
  }, [items, tab, q]);

  const refresh = () => {
    setOpenMenu(null);
    setRefreshKey((k) => k + 1);
  };

  useEffect(() => {
    if (!openMenu) return;
    const onDoc = () => setOpenMenu(null);
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [openMenu]);

  const ensureRequest = (row) => {
    const r = getRequests().find((x) => x.id === row.id);
    if (r) return r;
    return upsertRequest({
      id: row.id,
      title: row.title,
      type: row.type,
      risk: row.risk,
      status: row.status,
      owner: row.owner,
      counterparty: row.title.split("—")[0]?.trim() || row.title,
    });
  };

  const onApprove = (row) => {
    if (guard(ACTIONS.APPROVE, toast)) return;
    const r = ensureRequest(row);
    setRequestStatus(r.id, "Approved", "Approved from Legal Queue");
    toast.success("NDA approved", `${r.id} → Approved`);
    refresh();
  };
  const onReject = (row) => {
    if (guard(ACTIONS.REJECT, toast)) return;
    const r = ensureRequest(row);
    setRequestStatus(r.id, "Archived", "Rejected & archived from Legal Queue");
    toast.error("NDA rejected", `${r.id} → Archived`);
    refresh();
  };
  const onSendForSign = async (row) => {
    if (guard(ACTIONS.SEND_FOR_SIGN, toast)) return;
    const r = ensureRequest(row);
    if (r.status !== "Approved") {
      toast.warning(
        "Approve first",
        "This NDA must be Approved before it can be sent for signature."
      );
      return;
    }
    const res = await sendForSignature(r.id);
    if (!res.ok) {
      toast.error("Could not send for signature", res.error);
      return;
    }
    createTask({
      requestId: r.id,
      requestTitle: r.title,
      type: "Signature",
      assignedTo: r.owner || "Sara Patel",
      priority: "High",
      dueDate: Date.now() + 5 * 24 * 60 * 60 * 1000,
    });
    setSigInfo({
      recordId: r.id,
      recordTitle: r.title,
      counterpartyName: res.counterpartyName,
      email: res.email,
      url: res.url,
      reused: res.reused,
      emailDelivered: res.emailDelivered,
      emailConfigured: res.emailConfigured,
      emailError: res.emailError,
      messageId: res.messageId,
    });
    if (res.emailDelivered) {
      toast.success(
        res.reused ? "Signing link reused · email sent" : "Email sent to counterparty",
        `${r.id} → Awaiting Signature · ${res.email}`
      );
    } else if (res.emailConfigured === false) {
      toast.warning(
        "Link ready · SMTP not configured",
        `Use 'Send via my mail client' in the dialog to deliver the link to ${res.email}.`
      );
    } else {
      toast.error(
        "Link ready · email delivery failed",
        res.emailError || "Use the mail-client fallback in the dialog."
      );
    }
    refresh();
  };
  const onMoreInfo = (row) => {
    if (guard(ACTIONS.EDIT, toast)) return;
    const r = ensureRequest(row);
    createTask({
      requestId: r.id,
      requestTitle: r.title,
      type: "Missing Information",
      assignedTo: r.owner || "Sara Patel",
      priority: "High",
      dueDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
    });
    toast.info("Information requested", `Task created for ${r.id}.`);
    refresh();
  };
  const onEdit = (row) => {
    if (guard(ACTIONS.EDIT, toast)) return;
    router.push(`/requests/intake?edit=${encodeURIComponent(row.id)}`);
  };
  const onOpen = (row) => {
    router.push(`/repository?open=${encodeURIComponent(row.id)}`);
  };

  const onExport = () => {
    if (filtered.length === 0) {
      toast.warning("Nothing to export", "Adjust your filters to include rows.");
      return;
    }
    exportToCsv({
      filename: "NDAFlow_LegalQueue",
      columns: [
        { key: "id", label: "NDA ID" },
        { key: "title", label: "Title" },
        { key: "type", label: "Type" },
        { key: "risk", label: "Risk" },
        { key: "status", label: "Status" },
        { key: "owner", label: "Owner" },
      ],
      rows: filtered,
    });
    toast.success("Queue exported", `${filtered.length} item(s) downloaded as CSV.`);
  };

  return (
    <>
      <Topbar
        title="Legal Review Queue"
        subtitle="All NDAs requiring counsel attention. AI-prioritized by risk and SLA."
        actions={
          <button onClick={onExport} className="btn-ghost">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        }
      />

      <GlassCard className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-xl text-sm border transition ${
                  tab === t
                    ? "bg-grad-soft border-white/15 text-white"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search queue…"
                className="bg-transparent outline-none text-sm w-56 placeholder-slate-500"
              />
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <GlassCard className="xl:col-span-2 !p-0 overflow-visible">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03]">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-3 py-3 font-medium">ID</th>
                  <th className="px-3 py-3 font-medium">Title</th>
                  <th className="px-3 py-3 font-medium">Risk</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Owner</th>
                  <th className="px-3 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="table-row">
                    <td className="px-3 py-3 font-mono text-xs text-slate-300">{r.id}</td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-white">{r.title}</div>
                      <div className="text-[11px] text-slate-400">{r.type}</div>
                    </td>
                    <td className="px-3 py-3">
                      <RiskBadge level={r.risk} />
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-3 py-3 text-slate-300">{r.owner}</td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex flex-wrap items-center justify-end gap-1">
                        {can(ACTIONS.APPROVE) && (
                          <button
                            onClick={() => onApprove(r)}
                            className="btn-ghost !py-1 !px-2 text-xs text-emerald-300 hover:!text-emerald-200"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Approve
                          </button>
                        )}
                        {can(ACTIONS.REJECT) && (
                          <button
                            onClick={() => onReject(r)}
                            className="btn-ghost !py-1 !px-2 text-xs text-rose-300 hover:!text-rose-200"
                          >
                            <XCircle className="w-3 h-3" /> Reject
                          </button>
                        )}
                        {can(ACTIONS.SEND_FOR_SIGN) && r.status === "Approved" && (
                          <button
                            onClick={() => onSendForSign(r)}
                            className="btn-ghost !py-1 !px-2 text-xs text-cyan-300 hover:!text-cyan-200"
                          >
                            <PenTool className="w-3 h-3" /> Send to Sign
                          </button>
                        )}
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === r.id ? null : r.id)
                            }
                            className="btn-ghost !py-1 !px-2 text-xs"
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </button>
                          {openMenu === r.id && (
                            <div className="absolute right-0 top-full mt-1 z-30 w-52 bg-navy-900 border border-white/10 rounded-lg shadow-2xl py-1">
                              {can(ACTIONS.SEND_FOR_SIGN) && r.status !== "Approved" && (
                                <button
                                  onClick={() => onSendForSign(r)}
                                  className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
                                >
                                  <PenTool className="w-3 h-3 text-cyan-300" /> Send to Sign
                                </button>
                              )}
                              {can(ACTIONS.EDIT) && (
                                <button
                                  onClick={() => onEdit(r)}
                                  className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
                                >
                                  <Pencil className="w-3 h-3 text-amber-300" /> Edit NDA
                                </button>
                              )}
                              {can(ACTIONS.EDIT) && (
                                <button
                                  onClick={() => onMoreInfo(r)}
                                  className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
                                >
                                  <HelpCircle className="w-3 h-3 text-amber-300" />{" "}
                                  Request More Info
                                </button>
                              )}
                              <div className="border-t border-white/5 my-1" />
                              <button
                                onClick={() => onOpen(r)}
                                className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
                              >
                                <Eye className="w-3 h-3" /> Open in Repository
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-12 text-center text-slate-400">
                      <Inbox className="w-6 h-6 mx-auto mb-2" />
                      No items match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <div className="flex items-center gap-2 text-sm font-semibold gradient-text mb-3">
              <Sparkles className="w-4 h-4" /> AI Triage Suggestions
            </div>
            <ul className="space-y-3 text-sm">
              <li className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="font-medium">
                  NDA-2036 → assign to <span className="gradient-text">CISO</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Defense + High risk. SLA at risk.
                </div>
              </li>
              <li className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="font-medium">
                  NDA-2040 → loop in{" "}
                  <span className="gradient-text">Privacy Office</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  PII + cross-border detected.
                </div>
              </li>
              <li className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="font-medium">NDA-2029 → fast-track approve</div>
                <div className="text-xs text-slate-400 mt-1">
                  Standard vendor template, low risk.
                </div>
              </li>
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-2 text-sm font-semibold mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> SLA at risk
            </div>
            <div className="text-3xl font-bold">
              {filtered.filter((r) => r.risk === "High").length}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              high-risk items in current view.
            </div>
          </GlassCard>
        </div>
      </div>

      <SignatureSentModal info={sigInfo} onClose={() => setSigInfo(null)} />
    </>
  );
}
