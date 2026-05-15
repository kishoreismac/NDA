"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard, RiskBadge, StatusBadge } from "@/components/ui";
import DocumentAuditTrail from "@/components/DocumentAuditTrail";
import { useToast } from "@/components/Toast";
import {
  Search,
  Download,
  Filter,
  Eye,
  X,
  FileText,
  FileType2,
  Loader2,
  Calendar,
  User,
  Trash2,
} from "lucide-react";
import { recentRequests } from "@/lib/mockData";
import {
  getDocsForRecord,
  formatTimestamp,
  logAuditEvent,
} from "@/lib/auditTrail";
import { getTemplateById } from "@/lib/templates";
import { buildPlaceholderValues } from "@/lib/placeholders";
import {
  generateDocx,
  generatePdf,
  downloadBlob,
  buildFileName,
} from "@/lib/documentGenerator";
import {
  getRequests,
  setRequestStatus,
  deleteRequest,
} from "@/lib/requestStore";
import { exportToCsv } from "@/lib/csvExport";

const archive = [
  { id: "NDA-2025", title: "Pied Piper — Algorithm Review", type: "Mutual", risk: "High", status: "Signed", owner: "S. Patel", updated: "Apr 28" },
  { id: "NDA-2018", title: "Cyberdyne — Robotics License", type: "M&A", risk: "High", status: "Signed", owner: "A. Kim", updated: "Apr 12" },
  { id: "NDA-2012", title: "Sirius Cybernetics — Vendor", type: "Vendor", risk: "Low", status: "Signed", owner: "M. Davis", updated: "Mar 30" },
  { id: "NDA-2007", title: "Aperture Science — Test Pilot", type: "Mutual", risk: "Medium", status: "Approved", owner: "J. Nguyen", updated: "Mar 22" },
  { id: "NDA-1998", title: "Tessier-Ashpool — Data Sharing", type: "One-Way In", risk: "High", status: "Signed", owner: "E. Park", updated: "Mar 10" },
  { id: "NDA-1981", title: "Buy n Large — Supply Chain", type: "Vendor", risk: "Low", status: "Signed", owner: "M. Davis", updated: "Feb 28" },
];

function RepositoryInner() {
  const params = useSearchParams();
  const toast = useToast();
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [risk, setRisk] = useState("All");
  const [status, setStatus] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const allRecords = useMemo(() => {
    const stored = getRequests();
    const storedIds = new Set(stored.map((r) => r.id));
    const fallback = [...recentRequests, ...archive].filter(
      (r) => !storedIds.has(r.id)
    );
    return [...stored, ...fallback];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // Open from ?open=NDA-XXXX query param
  useEffect(() => {
    const id = params.get("open");
    if (id) setOpenId(id);
  }, [params]);

  const filtered = useMemo(() => {
    return allRecords.filter((r) => {
      if (type !== "All" && r.type !== type) return false;
      if (risk !== "All" && r.risk !== risk) return false;
      if (status !== "All" && r.status !== status) return false;
      if (q) {
        const s = q.toLowerCase();
        if (![r.id, r.title, r.owner, r.type].join(" ").toLowerCase().includes(s))
          return false;
      }
      return true;
    });
  }, [allRecords, q, type, risk, status]);

  const openRecord = allRecords.find((r) => r.id === openId);

  const onExport = () => {
    if (filtered.length === 0) {
      toast.warning("Nothing to export", "Adjust your filters to include rows.");
      return;
    }
    exportToCsv({
      filename: "NDAFlow_Repository",
      columns: [
        { key: "id", label: "NDA ID" },
        { key: "title", label: "Title" },
        { key: "type", label: "Type" },
        { key: "risk", label: "Risk" },
        { key: "status", label: "Status" },
        { key: "owner", label: "Owner" },
        {
          key: "updated",
          label: "Updated",
          accessor: (r) =>
            r.updatedAt
              ? new Date(r.updatedAt).toLocaleDateString("en-US")
              : r.updated || "",
        },
      ],
      rows: filtered,
    });
    toast.success(
      "Repository exported",
      `${filtered.length} record(s) downloaded as CSV.`
    );
  };

  const onSendForSign = (record) => {
    setRequestStatus(record.id, "Awaiting Signature");
    toast.success("Sent for signature", `${record.id} → Awaiting Signature`);
    setRefreshKey((k) => k + 1);
  };
  const onMarkSigned = (record) => {
    setRequestStatus(record.id, "Signed", "Marked as signed (simulated)");
    toast.success("NDA signed", `${record.id} → Signed`);
    setRefreshKey((k) => k + 1);
  };
  const onCancel = (record) => {
    setRequestStatus(record.id, "Cancelled");
    toast.error("NDA cancelled", `${record.id} → Cancelled`);
    setRefreshKey((k) => k + 1);
  };
  const onDelete = (record) => {
    deleteRequest(record.id);
    logAuditEvent({
      action: "Record deleted",
      target: record.title,
      recordId: record.id,
    });
    toast.error("Record deleted", `${record.id} removed from repository.`);
    setOpenId(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <Topbar
        title="NDA Repository"
        subtitle="Search, filter, inspect, and re-download every NDA in your organization."
        actions={
          <button onClick={onExport} className="btn-ghost">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        }
      />

      <GlassCard className="mb-6">
        <div className="grid md:grid-cols-5 gap-3">
          <div className="md:col-span-2 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by ID, title, party, owner…"
              className="bg-transparent outline-none text-sm w-full placeholder-slate-500"
            />
          </div>
          <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
            {["All", "Mutual", "One-Way In", "One-Way Out", "Vendor", "M&A"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select className="input" value={risk} onChange={(e) => setRisk(e.target.value)}>
            {["All", "Low", "Medium", "High"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            {[
              "All",
              "Draft",
              "In Review",
              "Legal Review",
              "Approved",
              "Awaiting Signature",
              "Signed",
              "Priority",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="text-xs text-slate-400 mt-3 flex items-center gap-2">
          <Filter className="w-3 h-3" /> Showing{" "}
          <span className="text-white font-semibold">{filtered.length}</span> of{" "}
          {allRecords.length} records
        </div>
      </GlassCard>

      <GlassCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03]">
              <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Risk</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Owner</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="table-row cursor-pointer"
                  onClick={() => setOpenId(r.id)}
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-300">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-white">{r.title}</td>
                  <td className="px-4 py-3 text-slate-300">{r.type}</td>
                  <td className="px-4 py-3">
                    <RiskBadge level={r.risk} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-300">{r.owner}</td>
                  <td className="px-4 py-3 text-slate-400">{r.updated}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenId(r.id);
                      }}
                      className="btn-ghost !py-1 !px-2 text-xs"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {openRecord && (
        <RecordDetailDrawer
          record={openRecord}
          onClose={() => setOpenId(null)}
          onSendForSign={onSendForSign}
          onMarkSigned={onMarkSigned}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

export default function RepositoryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400">Loading repository…</div>}>
      <RepositoryInner />
    </Suspense>
  );
}

function RecordDetailDrawer({
  record,
  onClose,
  onSendForSign,
  onMarkSigned,
  onCancel,
  onDelete,
}) {
  const toast = useToast();
  const [docs, setDocs] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [busy, setBusy] = useState(null);

  useEffect(() => {
    setDocs(getDocsForRecord(record.id));
  }, [record.id, refreshKey]);

  const handleDownload = async (doc, format) => {
    setBusy(doc.id + format);
    try {
      const template = getTemplateById(doc.templateId);
      if (!template) {
        toast.error("Template missing", "Cannot regenerate document.");
        return;
      }
      const values = buildPlaceholderValues({
        counterpartyName: doc.counterparty,
        recordTitle: doc.recordTitle,
      });
      const meta = {
        id: doc.id,
        recordId: doc.recordId,
        recordTitle: doc.recordTitle,
      };
      const blob =
        format === "docx"
          ? await generateDocx({ template, values, meta })
          : await generatePdf({ template, values, meta });
      const base = buildFileName({ counterparty: doc.counterparty });
      const filename = `${base}_${safeName(doc.templateName)}.${format}`;
      const ok = await downloadBlob(blob, filename);
      if (!ok) throw new Error("Browser blocked the download.");
      logAuditEvent({
        action: `Repository ${format.toUpperCase()} downloaded`,
        target: filename,
        recordId: record.id,
      });
      toast.success(`${format.toUpperCase()} downloaded`, filename);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      toast.error(
        `${format.toUpperCase()} download failed`,
        err?.message || "Please try again."
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/60 backdrop-blur-sm" />
      <aside
        className="w-full max-w-2xl h-full bg-navy-950 border-l border-white/10 overflow-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-start justify-between sticky top-0 bg-navy-950 z-10">
          <div>
            <div className="font-mono text-xs text-cyanglow">{record.id}</div>
            <div className="text-lg font-semibold text-white mt-1">{record.title}</div>
            <div className="flex items-center gap-2 mt-2">
              <RiskBadge level={record.risk} />
              <StatusBadge status={record.status} />
              <span className="text-[11px] text-slate-400">{record.type}</span>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost text-xs">
            <X className="w-4 h-4" /> Close
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Meta */}
          <GlassCard className="!p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Meta icon={User} label="Owner" value={record.owner} />
              <Meta
                icon={Calendar}
                label="Updated"
                value={
                  record.updatedAt
                    ? formatTimestamp(record.updatedAt)
                    : record.updated || "—"
                }
              />
            </div>
          </GlassCard>

          {/* Workflow actions */}
          <GlassCard className="!p-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-3">
              Workflow Actions
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onSendForSign(record)}
                disabled={record.status !== "Approved"}
                title={
                  record.status === "Approved"
                    ? "Send for signature"
                    : "Available after Approved"
                }
                className="btn-ghost text-xs disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send for Sign
              </button>
              <button
                onClick={() => onMarkSigned(record)}
                disabled={record.status !== "Awaiting Signature"}
                title={
                  record.status === "Awaiting Signature"
                    ? "Mark as signed"
                    : "Available after Awaiting Signature"
                }
                className="btn-ghost text-xs text-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Mark Signed
              </button>
              <button
                onClick={() => onCancel(record)}
                disabled={["Signed", "Cancelled", "Rejected"].includes(
                  record.status
                )}
                className="btn-ghost text-xs text-amber-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Cancel NDA
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete ${record.id}? This cannot be undone.`)) {
                    onDelete(record);
                  }
                }}
                className="btn-ghost text-xs text-rose-300 ml-auto"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </GlassCard>

          {/* Documents section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyanglow" /> Documents
              </h4>
              <span className="text-[11px] text-slate-400">
                {docs.length} generated
              </span>
            </div>
            {docs.length === 0 ? (
              <GlassCard className="!p-5 text-center text-xs text-slate-400">
                No final NDA documents have been generated for this record yet.
              </GlassCard>
            ) : (
              <div className="space-y-2">
                {docs.map((d) => (
                  <GlassCard key={d.id} className="!p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                          {d.templateName}{" "}
                          <span className="text-slate-400 font-normal">
                            {d.templateVersion}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {d.id} · {formatTimestamp(d.generatedAt)} · {d.generatedBy}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {d.placeholdersFilled}/{d.placeholders} placeholders filled
                          · Counterparty: {d.counterparty}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => handleDownload(d, "docx")}
                          disabled={!!busy}
                          className="btn-ghost text-xs !py-1 !px-2 disabled:opacity-40"
                        >
                          {busy === d.id + "docx" ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <FileType2 className="w-3 h-3" />
                          )}
                          DOCX
                        </button>
                        <button
                          onClick={() => handleDownload(d, "pdf")}
                          disabled={!!busy}
                          className="btn-ghost text-xs !py-1 !px-2 disabled:opacity-40"
                        >
                          {busy === d.id + "pdf" ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Download className="w-3 h-3" />
                          )}
                          PDF
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>

          {/* Audit trail for this record */}
          <DocumentAuditTrail
            recordId={record.id}
            title="Record Audit Trail"
            compact
            refreshKey={refreshKey}
          />
        </div>
      </aside>
    </div>
  );
}

function Meta({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 grid place-items-center">
        <Icon className="w-4 h-4 text-slate-300" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-slate-400">
          {label}
        </div>
        <div className="text-sm text-white">{value}</div>
      </div>
    </div>
  );
}

function safeName(s = "") {
  return s.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
}
