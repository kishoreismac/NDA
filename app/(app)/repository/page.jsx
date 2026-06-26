"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard, RiskBadge, StatusBadge } from "@/components/ui";
import DocumentAuditTrail from "@/components/DocumentAuditTrail";
import { useToast } from "@/components/Toast";
import {
  Search,
  Download,
  Filter,
  Eye,
  EyeOff,
  X,
  FileText,
  FileType2,
  Loader2,
  Calendar,
  User,
  Trash2,
  MoreHorizontal,
  Tag,
  Pencil,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { recentRequests } from "@/lib/mockData";
import {
  getDocsForRecord,
  formatTimestamp,
  logAuditEvent,
} from "@/lib/auditTrail";
import { getTemplateById } from "@/lib/templates";
import { buildPlaceholderValues, applyPlaceholders } from "@/lib/placeholders";
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
  upsertRequest,
  hydrateFormFromRecord,
  formatExpirationDate,
  isExpiringSoon,
  isExpired,
} from "@/lib/requestStore";
import { exportToCsv } from "@/lib/csvExport";
import { useCurrentRole, ACTIONS } from "@/lib/permissions";
import { sendForSignature, buildSignedPdfBlob } from "@/lib/signatureService";
import SignatureSentModal from "@/components/SignatureSentModal";

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
  const router = useRouter();
  const toast = useToast();
  const { guard, can } = useCurrentRole();
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [risk, setRisk] = useState("All");
  const [status, setStatus] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [tagModal, setTagModal] = useState(null); // record being tagged
  const [sigInfo, setSigInfo] = useState(null); // signature sent modal
  const [tags, setTags] = useState({}); // { recordId: ["tag1", ...] }
  const menuRef = useRef(null);

  const allRecords = useMemo(() => {
    // Use the store as the single source of truth so that counts match the
    // dashboard exactly. Legacy mock fallbacks were causing inflated rows.
    return getRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // Open from ?open=NDA-XXXX query param
  useEffect(() => {
    const id = params.get("open");
    if (id) setOpenId(id);
    const s = params.get("status");
    const rk = params.get("risk");
    if (s) {
      if (s === "Active") setStatus("All"); // active = multiple, handled below
      else if (s === "Approval") setStatus("In Review");
      else setStatus(s);
    }
    if (rk) setRisk(rk);
  }, [params]);

  // Load tags from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("clm.tags.v1");
      if (raw) setTags(JSON.parse(raw));
    } catch {}
  }, []);

  // Refresh when the signature sync (or other writers) update records.
  useEffect(() => {
    const bump = () => setRefreshKey((k) => k + 1);
    window.addEventListener("clm:requests-changed", bump);
    window.addEventListener("clm:signatures-changed", bump);
    return () => {
      window.removeEventListener("clm:requests-changed", bump);
      window.removeEventListener("clm:signatures-changed", bump);
    };
  }, []);

  const persistTags = (next) => {
    setTags(next);
    try {
      window.localStorage.setItem("clm.tags.v1", JSON.stringify(next));
    } catch {}
  };

  // Close menu on outside click
  useEffect(() => {
    const fn = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpenId(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const ACTIVE_STATUSES = [
    "In Review",
    "Approved",
    "Awaiting Signature",
  ];
  const isActiveFilter = params.get("status") === "Active";
  const isRenewalsFilter = params.get("filter") === "renewals";

  const filtered = useMemo(() => {
    return allRecords.filter((r) => {
      if (isActiveFilter && !ACTIVE_STATUSES.includes(r.status)) return false;
      if (isRenewalsFilter && !isExpiringSoon(r, 30) && !isExpired(r)) return false;
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
  }, [allRecords, q, type, risk, status, isActiveFilter, isRenewalsFilter]);

  const openRecord = allRecords.find((r) => r.id === openId);

  // Quick-download the signed PDF directly from a row (skips opening the
  // drawer). Always regenerates from template + form + stored signature
  // image so the download works even if no base64 was persisted.
  const onDownloadSignedPdf = async (r) => {
    try {
      const res = await buildSignedPdfBlob(r.id);
      if (!res.ok) {
        toast.warning("No signed PDF yet", res.error || "Sign the NDA first.");
        return;
      }
      const url = URL.createObjectURL(res.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = res.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      logAuditEvent({
        action: "Signed PDF downloaded",
        target: res.filename,
        recordId: r.id,
      });
      toast.success("Signed PDF downloaded", res.filename);
    } catch (e) {
      toast.error("Download failed", e?.message || "Please try again.");
    }
  };

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
        {
          key: "timestamp",
          label: "Time Stamp",
          accessor: (r) =>
            r.updatedAt ? new Date(r.updatedAt).toLocaleString("en-US") : "",
        },
      ],
      rows: filtered,
    });
    toast.success(
      "Repository exported",
      `${filtered.length} record(s) downloaded as CSV.`
    );
  };

  const onSendForSign = async (record) => {
    if (guard(ACTIONS.SEND_FOR_SIGN, toast)) return;
    // Make sure we have a fully-formed stored record (with form.counterpartyEmail).
    ensurePersistedForEdit(record);
    if (record.status !== "Approved") {
      toast.warning(
        "Approve first",
        "Only Approved NDAs can be sent for e-signature."
      );
      return;
    }
    const res = await sendForSignature(record.id);
    if (!res.ok) {
      toast.error("Could not send for signature", res.error);
      return;
    }
    setSigInfo({
      recordId: record.id,
      recordTitle: record.title,
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
        `${record.id} → Awaiting Signature · ${res.email}`
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
    setRefreshKey((k) => k + 1);
  };
  const onMarkSigned = (record) => {
    if (guard(ACTIONS.SEND_FOR_SIGN, toast)) return;
    setRequestStatus(record.id, "Signed", "Marked as signed (simulated)");
    toast.success("NDA signed", `${record.id} → Signed`);
    setRefreshKey((k) => k + 1);
  };
  const onCancel = (record) => {
    if (guard(ACTIONS.REJECT, toast)) return;
    setRequestStatus(record.id, "Archived");
    toast.error("NDA archived", `${record.id} → Archived`);
    setRefreshKey((k) => k + 1);
  };
  const onDelete = (record) => {
    if (guard(ACTIONS.DELETE, toast)) return;
    if (!confirm(`Delete ${record.id}? This cannot be undone.`)) return;
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

  const onAddTag = (record) => {
    if (guard(ACTIONS.ADD_TAG, toast)) return;
    setTagModal(record);
    setMenuOpenId(null);
  };
  // Make sure the record exists in the store with a fully-hydrated `form`
  // before we navigate to the intake editor. This covers fallback mock
  // records (recentRequests / archive) that were never persisted.
  const ensurePersistedForEdit = (record) => {
    const stored = getRequests().find((r) => r.id === record.id);
    const hydratedForm = hydrateFormFromRecord(stored || record);
    upsertRequest({
      ...(stored || {}),
      id: record.id,
      title: record.title || stored?.title,
      recordType: record.recordType || stored?.recordType || "Non-Disclosure Agreement (NDA)",
      type: record.type || stored?.type,
      risk: record.risk || stored?.risk,
      status: record.status || stored?.status || "In Review",
      owner: record.owner || stored?.owner,
      counterparty: record.counterparty || hydratedForm.counterpartyName,
      templateId: record.templateId || stored?.templateId || hydratedForm.templateId,
      form: hydratedForm,
      answers: stored?.answers || {},
    });
  };

  const onEditNda = (record) => {
    setMenuOpenId(null);
    if (guard(ACTIONS.EDIT, toast)) return;
    ensurePersistedForEdit(record);
    toast.info("Opening editor", `${record.id} — all details prefilled for editing.`);
    router.push(`/requests/intake?edit=${encodeURIComponent(record.id)}`);
  };
  const onRenewNda = (record) => {
    setMenuOpenId(null);
    if (guard(ACTIONS.RENEW, toast)) return;
    ensurePersistedForEdit(record);
    toast.info("Opening renewal", `${record.id} — review and update term details.`);
    router.push(`/requests/intake?renew=${encodeURIComponent(record.id)}`);
  };

  return (
    <>
      <Topbar
        title="Contract Repository"
        subtitle="Search, filter, inspect, tag, edit and renew every contract in your organization."
        actions={
          <button data-testid="repository-export-csv" onClick={onExport} className="btn-ghost">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        }
      />

      <GlassCard className="mb-6">
        <div className="grid md:grid-cols-5 gap-3">
          <div className="md:col-span-2 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              data-testid="repository-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by ID, title, party, owner…"
              className="bg-transparent outline-none text-sm w-full placeholder-slate-500"
            />
          </div>
          <select data-testid="repository-type-filter" className="input" value={type} onChange={(e) => setType(e.target.value)}>
            {["All", "Mutual", "One-Way In", "One-Way Out", "Vendor", "M&A"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select data-testid="repository-risk-filter" className="input" value={risk} onChange={(e) => setRisk(e.target.value)}>
            {["All", "Low", "Medium", "High"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select data-testid="repository-status-filter" className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            {[
              "All",
              "In Review",
              "Approved",
              "Awaiting Signature",
              "Signed",
              "Archived",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="text-xs text-slate-400 mt-3 flex items-center gap-2 flex-wrap">
          <Filter className="w-3 h-3" /> Showing{" "}
          <span className="text-white font-semibold">{filtered.length}</span> of{" "}
          {allRecords.length} records
          {isRenewalsFilter && (
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/30 text-fuchsia-100 text-[10px] uppercase tracking-wider">
              <RefreshCw className="w-3 h-3" /> Renewals · expiring in 30 days or already expired
              <button
                type="button"
                onClick={() => router.push("/repository")}
                className="ml-2 underline hover:text-white"
              >
                Clear
              </button>
            </span>
          )}
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
                <th className="px-4 py-3 font-medium">Expires</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">Time Stamp</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  data-testid="repository-row"
                  data-record-id={r.id}
                  data-status={r.status}
                  className="table-row cursor-pointer"
                  onClick={() => setOpenId(r.id)}
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-300">{r.id}</td>
                  <td className="px-4 py-3 font-medium text-white">
                    <div>{r.title}</div>
                    {tags[r.id]?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tags[r.id].map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-200 border border-cyan-400/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{r.type}</td>
                  <td className="px-4 py-3">
                    <RiskBadge level={r.risk} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-300">{r.owner}</td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap">
                    {(() => {
                      const label = formatExpirationDate(r);
                      if (label === "—")
                        return <span className="text-slate-500">—</span>;
                      const expired = isExpired(r);
                      const soon = isExpiringSoon(r, 30);
                      const cls = expired
                        ? "text-rose-300"
                        : soon
                        ? "text-amber-300"
                        : "text-slate-300";
                      return (
                        <span className={cls}>
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
                    })()}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{r.updated}</td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap" title={
                    r.updatedAt ? new Date(r.updatedAt).toLocaleString("en-US") : ""
                  }>
                    {r.updatedAt ? formatTimestamp(r.updatedAt) : "—"}
                  </td>
                  <td
                    className="px-4 py-3 text-right relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <button
                        data-testid="repository-view"
                        onClick={() => setOpenId(r.id)}
                        className="btn-ghost !py-1 !px-2 text-xs"
                      >
                        <Eye className="w-3 h-3" /> View
                      </button>
                      {r.status === "Signed" && (
                        <button
                          data-testid="repository-download-signed-pdf"
                          onClick={() => onDownloadSignedPdf(r)}
                          className="btn-ghost !py-1 !px-2 text-xs text-emerald-300"
                          title="Download signed PDF with embedded signature"
                        >
                          <Download className="w-3 h-3" /> Signed PDF
                        </button>
                      )}
                      {can(ACTIONS.DELETE) && (
                        <button
                          data-testid="repository-delete"
                          onClick={() => {
                            if (
                              confirm(
                                `Delete ${r.id} — "${r.title}"? This will remove it for all users and cannot be undone.`
                              )
                            ) {
                              onDelete(r);
                            }
                          }}
                          className="btn-ghost !py-1 !px-2 text-xs text-rose-300"
                          title="Delete document (admin only)"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      )}
                      <button
                        data-testid="repository-row-actions"
                        onClick={() =>
                          setMenuOpenId((id) => (id === r.id ? null : r.id))
                        }
                        className="btn-ghost !py-1 !px-2 text-xs"
                        title="More actions"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {menuOpenId === r.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-4 top-full mt-1 w-44 bg-navy-950 border border-white/10 rounded-xl shadow-2xl z-30 overflow-hidden"
                      >
                        <button
                          data-testid="repository-add-tag"
                          onClick={() => onAddTag(r)}
                          className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/5 flex items-center gap-2"
                        >
                          <Tag className="w-3.5 h-3.5 text-cyanglow" /> Add tag
                        </button>
                        <button
                          data-testid="repository-edit-nda"
                          onClick={() => onEditNda(r)}
                          className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/5 flex items-center gap-2"
                        >
                          <Pencil className="w-3.5 h-3.5 text-violet-300" /> Edit NDA
                        </button>
                        <button
                          data-testid="repository-renew-nda"
                          onClick={() => onRenewNda(r)}
                          className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-white/5 flex items-center gap-2"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-emerald-300" /> Renew NDA
                        </button>
                      </div>
                    )}
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

      {tagModal && (
        <AddTagModal
          record={tagModal}
          existing={tags[tagModal.id] || []}
          onClose={() => setTagModal(null)}
          onSave={(arr) => {
            persistTags({ ...tags, [tagModal.id]: arr });
            logAuditEvent({
              action: "Tags updated",
              target: arr.join(", ") || "(cleared)",
              recordId: tagModal.id,
            });
            toast.success("Tags saved", `${tagModal.id} — ${arr.length} tag(s)`);
            setTagModal(null);
          }}
        />
      )}

      <SignatureSentModal info={sigInfo} onClose={() => setSigInfo(null)} />
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

function AddTagModal({ record, existing, onClose, onSave }) {
  const [list, setList] = useState(existing);
  const [val, setVal] = useState("");
  const add = () => {
    const v = val.trim();
    if (!v || list.includes(v)) return;
    setList([...list, v]);
    setVal("");
  };
  const remove = (t) => setList(list.filter((x) => x !== t));
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-navy-950 border border-white/10 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-lg font-semibold text-white">Add tag</div>
            <div className="text-xs text-slate-400 mt-1 font-mono">{record.id}</div>
          </div>
          <button onClick={onClose} className="btn-ghost text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-2 rounded-lg bg-white/[0.03] border border-white/5">
          {list.length === 0 && (
            <span className="text-xs text-slate-500">No tags yet.</span>
          )}
          {list.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded bg-cyan-500/15 text-cyan-200 border border-cyan-400/20 flex items-center gap-1.5"
            >
              {t}
              <button onClick={() => remove(t)} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="e.g. confidential, urgent, renewal"
            className="input flex-1"
          />
          <button onClick={add} className="btn-ghost">
            <Tag className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button onClick={() => onSave(list)} className="btn-primary">
            Save tags
          </button>
        </div>
      </div>
    </div>
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
      // For a counter-signed doc, regenerate the signed PDF on demand so
      // it always reflects the captured signature + filled placeholders.
      if (format === "pdf" && doc.signed) {
        const res = await buildSignedPdfBlob(record.id);
        if (!res.ok) {
          toast.error("Signed PDF unavailable", res.error);
          return;
        }
        const ok = await downloadBlob(res.blob, res.filename);
        if (!ok) throw new Error("Browser blocked the download.");
        logAuditEvent({
          action: "Signed PDF downloaded",
          target: res.filename,
          recordId: record.id,
        });
        toast.success("Signed PDF downloaded", res.filename);
        return;
      }

      const template = getTemplateById(doc.templateId);
      if (!template) {
        toast.error("Template missing", "Cannot regenerate document.");
        return;
      }
      // Build placeholder values from the FULL record form (not just title/cp)
      // so every field — addresses, purpose, signers — substitutes correctly.
      const form = {
        ...(record.form || {}),
        // ensure record-level fallbacks are present even if form is sparse
        counterpartyName:
          record.form?.counterpartyName ||
          doc.counterparty ||
          record.counterparty,
        recordTitle: record.form?.recordTitle || doc.recordTitle || record.title,
      };
      const values = buildPlaceholderValues(form);
      const meta = {
        id: doc.id,
        recordId: doc.recordId,
        recordTitle: doc.recordTitle,
        signatureImage: doc.signatureImage || null,
        signedBy: doc.signedBy || null,
        signerTitle: doc.signerTitle || null,
        signedAt: doc.generatedAt,
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
    <div data-testid="repository-detail-drawer" className="fixed inset-0 z-50 flex" onClick={onClose}>
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
                data-testid="repository-detail-send-for-sign"
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
                data-testid="repository-detail-mark-signed"
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
                disabled={["Signed", "Archived"].includes(
                  record.status
                )}
                className="btn-ghost text-xs text-amber-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Cancel NDA
              </button>
              <button
                data-testid="repository-detail-delete"
                onClick={() => onDelete(record)}
                className="btn-ghost text-xs text-rose-300 ml-auto"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </GlassCard>

          {/* Final NDA Document — full rendered view with embedded signature
              (when signed) and DOCX/PDF download. Replaces the old separate
              Preview + Final Signed + Documents list sections. */}
          <div data-testid="repository-final-document-section">
            <FinalDocumentSection
              record={record}
              busy={busy}
              onDownload={async (format) => {
              const template = getTemplateById(record.templateId);
              if (!template) {
                toast.error("Template missing", "Cannot generate document.");
                return;
              }
              setBusy("doc" + format);
              try {
                // Signed PDF path: always rebuild from the signed-PDF helper
                // so it carries the embedded counter-signature image.
                if (format === "pdf" && record.signedAt && record.signedBy) {
                  const res = await buildSignedPdfBlob(record.id);
                  if (!res.ok) throw new Error(res.error);
                  const ok = await downloadBlob(res.blob, res.filename);
                  if (!ok) throw new Error("Browser blocked the download.");
                  logAuditEvent({
                    action: "Signed PDF downloaded",
                    target: res.filename,
                    recordId: record.id,
                  });
                  toast.success("Signed PDF downloaded", res.filename);
                  return;
                }

                const form = {
                  ...(record.form || {}),
                  counterpartyName:
                    record.form?.counterpartyName || record.counterparty,
                  recordTitle:
                    record.form?.recordTitle || record.title,
                  counterpartySignerName:
                    record.signedBy ||
                    record.form?.counterpartySignerName ||
                    "",
                  counterpartySignerTitle:
                    record.signerTitle ||
                    record.form?.counterpartySignerTitle ||
                    "",
                };
                const values = buildPlaceholderValues(form);
                const meta = {
                  id: record.id,
                  recordId: record.id,
                  recordTitle: record.title,
                  signatureImage: record.signatureImage || null,
                  signedBy: record.signedBy || null,
                  signerTitle: record.signerTitle || null,
                  signedAt: record.signedAt || null,
                };
                const blob =
                  format === "docx"
                    ? await generateDocx({ template, values, meta })
                    : await generatePdf({ template, values, meta });
                const base = buildFileName({
                  counterparty: record.counterparty || form.counterpartyName,
                });
                const suffix = record.signedAt ? "SIGNED" : safeName(template.name || "NDA");
                const filename = `${base}_${suffix}.${format}`;
                const ok = await downloadBlob(blob, filename);
                if (!ok) throw new Error("Browser blocked the download.");
                logAuditEvent({
                  action: `Document ${format.toUpperCase()} downloaded`,
                  target: filename,
                  recordId: record.id,
                });
                toast.success(`${format.toUpperCase()} downloaded`, filename);
              } catch (err) {
                console.error(err);
                toast.error(
                  `${format.toUpperCase()} download failed`,
                  err?.message || "Please try again."
                );
              } finally {
                setBusy(null);
              }
              }}
            />
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

// Final NDA Document section — renders the full document inline (with all
// placeholders substituted and, when signed, the counterparty signature
// block embedded) and exposes DOCX + PDF downloads. The PDF download
// reuses the signed-PDF helper when the record has been counter-signed so
// the downloaded file always contains the embedded signature image.
function FinalDocumentSection({ record, busy, onDownload }) {
  const [showPreview, setShowPreview] = useState(false);
  const template = getTemplateById(record.templateId);
  const values = useMemo(() => {
    const form = {
      ...(record.form || {}),
      counterpartyName:
        record.form?.counterpartyName || record.counterparty,
      recordTitle: record.form?.recordTitle || record.title,
      counterpartySignerName:
        record.signedBy || record.form?.counterpartySignerName || "",
      counterpartySignerTitle:
        record.signerTitle || record.form?.counterpartySignerTitle || "",
    };
    return buildPlaceholderValues(form);
  }, [record]);

  const isSigned = !!(record.signedAt && record.signedBy);

  if (!template) {
    return (
      <GlassCard className="!p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyanglow" /> Document
          </h4>
        </div>
        <div className="text-xs text-slate-400">
          No template is bound to this record. Open the intake flow to
          assign a template before generating the NDA.
        </div>
      </GlassCard>
    );
  }

  const blocks = Array.isArray(template.content) ? template.content : [];

  return (
    <GlassCard
      className={
        "!p-5 " +
        (isSigned ? "border-emerald-400/30 bg-emerald-500/5" : "")
      }
    >
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {isSigned ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            ) : (
              <FileText className="w-4 h-4 text-cyanglow" />
            )}
            <h4 className="text-sm font-semibold text-white">
              {isSigned ? "Final Signed NDA" : "NDA Document"}
            </h4>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {template.name}
            {template.version ? ` · ${template.version}` : ""}
            {isSigned ? (
              <>
                {" · Counter-signed by "}
                <span className="text-white font-medium">
                  {record.signedBy}
                </span>
                {record.signerTitle ? `, ${record.signerTitle}` : ""}
                {" · "}
                {formatTimestamp(record.signedAt)}
              </>
            ) : null}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            data-testid="repository-document-preview"
            onClick={() => setShowPreview((v) => !v)}
            className="btn-ghost text-xs"
            title={showPreview ? "Hide document preview" : "Preview the full document inline"}
          >
            {showPreview ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            {showPreview ? "Hide Preview" : "Preview"}
          </button>
          <button
            data-testid="repository-download-docx"
            onClick={() => onDownload("docx")}
            disabled={!!busy}
            className="btn-ghost text-xs disabled:opacity-40"
            title="Download as Microsoft Word (.docx)"
          >
            {busy === "docdocx" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileType2 className="w-3.5 h-3.5" />
            )}
            Download DOCX
          </button>
          <button
            data-testid="repository-download-pdf"
            onClick={() => onDownload("pdf")}
            disabled={!!busy}
            className={
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap disabled:opacity-40 " +
              (isSigned
                ? "bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-100"
                : "btn-ghost")
            }
            title={
              isSigned
                ? "Download the signed PDF with the embedded counter-signature"
                : "Download as PDF"
            }
          >
            {busy === "docpdf" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            {isSigned ? "Download Signed PDF" : "Download PDF"}
          </button>
        </div>
      </div>

      <div className={"max-h-[640px] overflow-auto rounded-lg border border-white/10 bg-white text-slate-900 p-6 text-[13px] leading-relaxed shadow-inner " + (showPreview ? "" : "hidden")}>
        {blocks.length === 0 ? (
          <div className="text-slate-500 text-xs italic">
            This template has no content.
          </div>
        ) : (
          blocks.map((block, idx) => {
            const text = applyPlaceholders(block.text || "", values);
            if (block.type === "title") {
              return (
                <h2
                  key={idx}
                  className="text-center font-bold text-base uppercase tracking-wide mt-2 mb-3"
                >
                  {text}
                </h2>
              );
            }
            if (block.type === "subtitle") {
              return (
                <p
                  key={idx}
                  className="text-center text-[12px] text-slate-600 italic mb-4"
                >
                  {text}
                </p>
              );
            }
            if (block.type === "heading") {
              return (
                <h3
                  key={idx}
                  className="font-semibold text-[13px] mt-4 mb-1.5"
                >
                  {text}
                </h3>
              );
            }
            return (
              <p key={idx} className="mb-2 whitespace-pre-wrap">
                {text}
              </p>
            );
          })
        )}

        {/* Signature block — shown only when counter-signed */}
        {isSigned && (
          <div className="mt-8 pt-5 border-t-2 border-slate-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                  Counterparty Signature
                </div>
                {record.signatureImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={record.signatureImage}
                    alt="counterparty signature"
                    className="max-h-16 mb-1"
                  />
                )}
                <div className="border-b border-slate-400 mb-1" />
                <div className="text-[12px] font-semibold">
                  {record.signedBy}
                </div>
                {record.signerTitle && (
                  <div className="text-[11px] text-slate-600">
                    {record.signerTitle}
                  </div>
                )}
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Date: {formatTimestamp(record.signedAt)}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
                  Company Signature
                </div>
                <div className="h-16" />
                <div className="border-b border-slate-400 mb-1" />
                <div className="text-[12px] font-semibold">
                  {record.form?.companySignerName || "—"}
                </div>
                {record.form?.companySignerTitle && (
                  <div className="text-[11px] text-slate-600">
                    {record.form.companySignerTitle}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

function safeName(s = "") {
  return s.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
}
