// Request + task store backed by localStorage. Demo persistence.
// Provides the full status workflow + automatic task creation.

import { logAuditEvent } from "./auditTrail";

const REQ_KEY = "ndaflow.requests.v2";
const TASK_KEY = "ndaflow.tasks.v1";

// ---- canonical record types (CLM use cases) ----
export const RECORD_TYPES = [
  "Non-Disclosure Agreement (NDA)",
  "Master Service Agreement (MSA)",
  "Statement of Work (SOW)",
  "Vendor Agreement",
  "Supply Agreement",
  "Warehousing Services (3PL)",
  "Licensing Agreement",
  "Employment Contract",
  "Other",
];

// ---- canonical statuses (the only 5 we use) ----
export const STATUSES = [
  "In Review",
  "Approved",
  "Awaiting Signature",
  "Signed",
  "Archived",
];

// Map any legacy/alternate status to one of the 5 canonical statuses
export function normalizeStatus(s) {
  switch (s) {
    case "Draft":
    case "Submitted":
    case "Legal Review":
    case "Privacy Review":
    case "Priority":
      return "In Review";
    case "Rejected":
    case "Cancelled":
      return "Archived";
    case "In Review":
    case "Approved":
    case "Awaiting Signature":
    case "Signed":
    case "Archived":
      return s;
    default:
      return s || "In Review";
  }
}

export const TASK_TYPES = [
  "Legal Review",
  "Privacy Review",
  "Business Approval",
  "Signature",
  "Document Correction",
  "Missing Information",
  "Renewal Reminder",
];

export const TASK_STATUSES = [
  "Open",
  "In Progress",
  "Completed",
  "Rejected",
  "Cancelled",
  "Overdue",
];

// ---- storage helpers ----
function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function write(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ---- seed data (only used if storage empty) ----
const seedRequests = [
  {
    id: "NDA-2041",
    title: "Acme Robotics — Joint R&D",
    recordType: "Non-Disclosure Agreement (NDA)",
    type: "Mutual",
    risk: "Medium",
    status: "In Review",
    owner: "Sara Patel",
    counterparty: "Acme Robotics Inc.",
    templateId: "tpl-mutual",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
    riskScore: 58,
    workflowSteps: 4,
    form: {
      counterpartyId: "acme",
      counterpartyName: "Acme Robotics Inc.",
      counterpartyAddress: "500 Innovation Way, San Jose, CA 95110, USA",
      counterpartyContact: "Daniel Reeves",
      counterpartyEmail: "d.reeves@acmerobotics.com",
      counterpartyCountry: "United States",
      counterpartySignerName: "Daniel Reeves",
      counterpartySignerTitle: "Chief Technology Officer",
      companyName: "Contoso Corporation",
      companyAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
      companySignerName: "Sara Patel",
      companySignerTitle: "VP, Legal",
      recordTitle: "Acme Robotics — Joint R&D",
      recordOwner: "Sara Patel",
      businessUnit: "Corporate Development",
      purpose: "Joint research and development collaboration on autonomous robotics platforms.",
      confidentialInformation: "Source code, hardware schematics, sensor calibration data, roadmap.",
      effectiveDate: "2026-04-01",
      term: "two (2) years",
      survival: "three (3) years",
      templateId: "tpl-mutual",
      jurisdiction: "Delaware, USA",
      governingLaw: "Delaware, USA",
      direction: "mutual",
      type: "mutual",
    },
  },
  {
    id: "NDA-2040",
    title: "Northwind Pharma — Clinical Data",
    recordType: "Non-Disclosure Agreement (NDA)",
    type: "One-Way In",
    risk: "High",
    status: "Awaiting Signature",
    owner: "Jordan Nguyen",
    counterparty: "Northwind Pharma",
    templateId: "tpl-international",
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
    updatedAt: Date.now() - 1000 * 60 * 60 * 4,
    riskScore: 82,
    workflowSteps: 5,
    form: {
      counterpartyId: "northwind",
      counterpartyName: "Northwind Pharma",
      counterpartyAddress: "22 Harbor Drive, Boston, MA 02110, USA",
      counterpartyContact: "Dr. Anika Shah",
      counterpartyEmail: "a.shah@northwindpharma.com",
      counterpartyCountry: "United States",
      counterpartySignerName: "Dr. Anika Shah",
      counterpartySignerTitle: "VP, Clinical Development",
      companyName: "Contoso Corporation",
      companyAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
      companySignerName: "Jordan Nguyen",
      companySignerTitle: "Privacy Counsel",
      recordTitle: "Northwind Pharma — Clinical Data",
      recordOwner: "Jordan Nguyen",
      businessUnit: "Life Sciences",
      purpose: "Evaluation of de-identified clinical trial datasets for analytics partnership.",
      confidentialInformation: "Patient cohort statistics, trial protocols, biomarker results.",
      effectiveDate: "2026-03-15",
      term: "three (3) years",
      survival: "five (5) years",
      templateId: "tpl-international",
      jurisdiction: "New York, USA",
      governingLaw: "New York, USA",
      direction: "incoming",
      type: "oneway-incoming",
    },
  },
  {
    id: "NDA-2039",
    title: "Hooli Cloud — Hosting Eval",
    recordType: "Vendor Agreement",
    type: "Vendor",
    risk: "Low",
    status: "Approved",
    owner: "Maya Davis",
    counterparty: "Hooli Cloud",
    templateId: "tpl-vendor",
    createdAt: Date.now() - 1000 * 60 * 60 * 80,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24,
    riskScore: 28,
    workflowSteps: 2,
    form: {
      counterpartyId: "hooli",
      counterpartyName: "Hooli Cloud",
      counterpartyAddress: "1 Hooli Plaza, Palo Alto, CA 94301, USA",
      counterpartyContact: "Marcus Bell",
      counterpartyEmail: "marcus.bell@hooli.com",
      counterpartyCountry: "United States",
      counterpartySignerName: "Marcus Bell",
      counterpartySignerTitle: "Director, Strategic Partnerships",
      companyName: "Contoso Corporation",
      companyAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
      companySignerName: "Maya Davis",
      companySignerTitle: "Procurement Manager",
      recordTitle: "Hooli Cloud — Hosting Eval",
      recordOwner: "Maya Davis",
      businessUnit: "IT Operations",
      purpose: "Evaluate Hooli Cloud hosting services for production workloads.",
      confidentialInformation: "Architecture diagrams, traffic forecasts, pricing terms.",
      effectiveDate: "2026-02-10",
      term: "one (1) year",
      survival: "two (2) years",
      templateId: "tpl-vendor",
      jurisdiction: "California, USA",
      governingLaw: "California, USA",
      direction: "mutual",
      type: "vendor",
    },
  },
  {
    id: "NDA-2038",
    title: "Wayne Ent. — JV Exploration",
    recordType: "Master Service Agreement (MSA)",
    type: "M&A",
    risk: "High",
    status: "In Review",
    owner: "Alex Kim",
    counterparty: "Wayne Enterprises",
    templateId: "tpl-international",
    createdAt: Date.now() - 1000 * 60 * 60 * 60,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24,
    riskScore: 79,
    workflowSteps: 5,
    form: {
      counterpartyId: "wayne",
      counterpartyName: "Wayne Enterprises",
      counterpartyAddress: "1007 Mountain Drive, Gotham, NJ 07001, USA",
      counterpartyContact: "Lucius Fox",
      counterpartyEmail: "l.fox@wayneenterprises.com",
      counterpartyCountry: "United States",
      counterpartySignerName: "Lucius Fox",
      counterpartySignerTitle: "President, Wayne Enterprises",
      companyName: "Contoso Corporation",
      companyAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
      companySignerName: "Alex Kim",
      companySignerTitle: "Senior Counsel",
      recordTitle: "Wayne Ent. — JV Exploration",
      recordOwner: "Alex Kim",
      businessUnit: "Corporate Development",
      purpose: "Exploratory discussions for a joint venture on advanced materials manufacturing.",
      confidentialInformation: "Financial models, IP portfolio, manufacturing processes, M&A strategy.",
      effectiveDate: "2026-04-20",
      term: "five (5) years",
      survival: "seven (7) years",
      templateId: "tpl-international",
      jurisdiction: "Delaware, USA",
      governingLaw: "Delaware, USA",
      direction: "mutual",
      type: "mutual",
    },
  },
  {
    id: "NDA-2037",
    title: "Initech — Beta Software",
    recordType: "Licensing Agreement",
    type: "One-Way Out",
    risk: "Low",
    status: "Signed",
    owner: "Riley Gomez",
    counterparty: "Initech Software",
    templateId: "tpl-oneway-out",
    createdAt: Date.now() - 1000 * 60 * 60 * 96,
    updatedAt: Date.now() - 1000 * 60 * 60 * 48,
    riskScore: 22,
    workflowSteps: 2,
    form: {
      counterpartyId: "initech",
      counterpartyName: "Initech Software",
      counterpartyAddress: "4120 Freedom Blvd, Austin, TX 78701, USA",
      counterpartyContact: "Peter Gibbons",
      counterpartyEmail: "p.gibbons@initech.com",
      counterpartyCountry: "United States",
      counterpartySignerName: "Peter Gibbons",
      counterpartySignerTitle: "Head of Engineering",
      companyName: "Contoso Corporation",
      companyAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
      companySignerName: "Riley Gomez",
      companySignerTitle: "Sales Director",
      recordTitle: "Initech — Beta Software",
      recordOwner: "Riley Gomez",
      businessUnit: "Sales",
      purpose: "Provide Initech with early access to Contoso beta software for evaluation.",
      confidentialInformation: "Beta binaries, release notes, roadmap, performance benchmarks.",
      effectiveDate: "2026-01-05",
      term: "one (1) year",
      survival: "two (2) years",
      templateId: "tpl-oneway-out",
      jurisdiction: "Washington, USA",
      governingLaw: "Washington, USA",
      direction: "outgoing",
      type: "oneway-outgoing",
    },
  },
];

const dueIn = (days) => Date.now() + days * 24 * 60 * 60 * 1000;
const seedTasks = [
  {
    id: "T-1001",
    requestId: "NDA-2041",
    requestTitle: "Acme Robotics — Joint R&D",
    type: "Legal Review",
    assignedTo: "Alex Kim",
    dueDate: dueIn(2),
    priority: "High",
    status: "In Progress",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "T-1002",
    requestId: "NDA-2041",
    requestTitle: "Acme Robotics — Joint R&D",
    type: "Business Approval",
    assignedTo: "Sara Patel",
    dueDate: dueIn(3),
    priority: "Medium",
    status: "Open",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "T-1003",
    requestId: "NDA-2040",
    requestTitle: "Northwind Pharma — Clinical Data",
    type: "Privacy Review",
    assignedTo: "Privacy Office",
    dueDate: dueIn(-1),
    priority: "Critical",
    status: "Overdue",
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
  },
  {
    id: "T-1004",
    requestId: "NDA-2040",
    requestTitle: "Northwind Pharma — Clinical Data",
    type: "Signature",
    assignedTo: "Jordan Nguyen",
    dueDate: dueIn(2),
    priority: "High",
    status: "Open",
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
  },
  {
    id: "T-1005",
    requestId: "NDA-2038",
    requestTitle: "Wayne Ent. — JV Exploration",
    type: "Legal Review",
    assignedTo: "Alex Kim",
    dueDate: dueIn(1),
    priority: "High",
    status: "In Progress",
    createdAt: Date.now() - 1000 * 60 * 60 * 30,
  },
];

// ---- requests API ----
export function getRequests() {
  const list = read(REQ_KEY, null);
  if (!list) {
    write(REQ_KEY, seedRequests);
    return seedRequests.map((r) => ({ ...r, status: normalizeStatus(r.status) }));
  }
  return list.map((r) => ({ ...r, status: normalizeStatus(r.status) }));
}

export function getRequest(id) {
  return getRequests().find((r) => r.id === id) || null;
}

/**
 * Build a best-effort intake `form` object from any record (stored or mock).
 * Always returns a fully-populated form so the intake editor never opens blank.
 * Existing rec.form fields take precedence over derived defaults.
 */
export function hydrateFormFromRecord(rec) {
  if (!rec) return null;
  const counterparty =
    rec.counterparty ||
    (rec.title && rec.title.includes("—")
      ? rec.title.split("—")[0].trim()
      : rec.title) ||
    "";
  const recordTitle = rec.title || (counterparty ? `${counterparty} — NDA` : "");
  const typeLower = (rec.type || "").toLowerCase();
  const direction = typeLower.includes("one-way in") || typeLower.includes("incoming")
    ? "incoming"
    : typeLower.includes("one-way out") || typeLower.includes("outgoing")
    ? "outgoing"
    : "mutual";
  const defaults = {
    counterpartyId: "",
    counterpartyName: counterparty,
    counterpartyAddress: "",
    counterpartyContact: "",
    counterpartyEmail: "",
    counterpartyCountry: "United States",
    counterpartySignerName: "",
    counterpartySignerTitle: "Authorized Signatory",
    companyName: "Contoso Corporation",
    companyAddress: "1 Microsoft Way, Redmond, WA 98052, USA",
    companySignerName: rec.owner || "Sara Patel",
    companySignerTitle: "VP, Legal",
    employeeName: "",
    recordTitle,
    recordOwner: rec.owner || "Sara Patel",
    businessUnit: "Corporate Development",
    purpose: "",
    confidentialInformation: "",
    effectiveDate: rec.createdAt
      ? new Date(rec.createdAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    term: "two (2) years",
    survival: "three (3) years",
    templateId: rec.templateId || "tpl-standard",
    jurisdiction: "Delaware, USA",
    governingLaw: "Delaware, USA",
    direction,
    type: rec.type || "mutual",
  };
  // Layer rec.form on top of defaults (rec.form fields win)
  return { ...defaults, ...(rec.form || {}) };
}

export function newRequestId() {
  const list = getRequests();
  const max = list.reduce((m, r) => {
    const n = parseInt(String(r.id).replace(/\D/g, ""), 10) || 0;
    return Math.max(m, n);
  }, 2041);
  return `NDA-${max + 1}`;
}

export function upsertRequest(req) {
  const list = getRequests();
  const idx = list.findIndex((r) => r.id === req.id);
  const merged = {
    ...(idx >= 0 ? list[idx] : {}),
    ...req,
    updatedAt: Date.now(),
  };
  if (idx >= 0) list[idx] = merged;
  else list.unshift(merged);
  write(REQ_KEY, list);
  // Best-effort mirror to server so other users see the change.
  serverUpsert(merged);
  return merged;
}

export function deleteRequest(id) {
  const list = getRequests().filter((r) => r.id !== id);
  write(REQ_KEY, list);
  serverDelete(id);
}

export function setRequestStatus(id, status, note = "") {
  const r = getRequest(id);
  if (!r) return null;
  const next = normalizeStatus(status);
  const updated = upsertRequest({ ...r, id, status: next });
  logAuditEvent({
    action: `Status → ${next}`,
    target: r.title + (note ? ` (${note})` : ""),
    recordId: id,
  });
  return updated;
}

// ---- server-backed sync (so all users see all repository documents) ----

function serverUpsert(entry) {
  if (typeof window === "undefined") return;
  try {
    fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "upsert", entry }),
    }).catch(() => {});
  } catch {}
}

function serverDelete(id) {
  if (typeof window === "undefined") return;
  try {
    fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    }).catch(() => {});
  } catch {}
}

/**
 * Pull the canonical request list from the server and merge into local
 * cache so every user sees the same repository.
 *
 * - On first run for a fresh device, also pushes the local seed up so
 *   the server has at least the demo data.
 * - Server is authoritative for status / form changes; deletes are
 *   honored (records present locally but absent server-side are removed).
 *
 * Returns the number of changes applied locally.
 */
export async function syncRequests() {
  if (typeof window === "undefined") return 0;
  let remote = [];
  try {
    const r = await fetch("/api/requests", { cache: "no-store" });
    if (!r.ok) return 0;
    const data = await r.json();
    remote = Array.isArray(data?.requests) ? data.requests : [];
  } catch {
    return 0;
  }

  // First-load seeding: server is empty → push current local list up.
  if (remote.length === 0) {
    const local = getRequests();
    if (local.length > 0) {
      try {
        await fetch("/api/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "bulk-upsert", entries: local }),
        });
      } catch {}
    }
    return 0;
  }

  const local = read(REQ_KEY, []) || [];
  const remoteById = new Map(remote.map((r) => [r.id, r]));
  const localById = new Map(local.map((r) => [r.id, r]));
  let changed = 0;

  // Apply remote → local (newer-wins by updatedAt; unknown remote rows added).
  for (const r of remote) {
    const cur = localById.get(r.id);
    if (!cur) {
      changed++;
    } else if ((r.updatedAt || 0) > (cur.updatedAt || 0)) {
      changed++;
    }
  }

  // Drop local rows that no longer exist on the server (admin deletes).
  for (const r of local) {
    if (!remoteById.has(r.id)) changed++;
  }

  if (changed > 0) {
    // Remote is authoritative.
    write(REQ_KEY, remote.map((r) => ({ ...r, status: normalizeStatus(r.status) })));
  }
  return changed;
}

// ---- tasks API ----
export function getTasks() {
  const list = read(TASK_KEY, null);
  if (!list) {
    write(TASK_KEY, seedTasks);
    return autoExpireTasks([...seedTasks]);
  }
  return autoExpireTasks([...list]);
}

// Mark Open/In Progress tasks past due as Overdue (live).
function autoExpireTasks(list) {
  const now = Date.now();
  return list.map((t) => {
    if (
      (t.status === "Open" || t.status === "In Progress") &&
      t.dueDate &&
      t.dueDate < now
    ) {
      return { ...t, status: "Overdue" };
    }
    return t;
  });
}

export function getTasksForRequest(requestId) {
  return getTasks().filter((t) => t.requestId === requestId);
}

export function upsertTask(task) {
  const list = read(TASK_KEY, seedTasks);
  const idx = list.findIndex((t) => t.id === task.id);
  const merged = { ...(idx >= 0 ? list[idx] : {}), ...task };
  if (idx >= 0) list[idx] = merged;
  else list.unshift(merged);
  write(TASK_KEY, list);
  return merged;
}

let taskCounter = 0;
export function createTask(partial) {
  const id =
    "T-" +
    (1100 +
      ((Date.now() % 9000) + (taskCounter++ % 100)).toString().padStart(3, "0"));
  const task = {
    id,
    status: "Open",
    priority: "Medium",
    createdAt: Date.now(),
    dueDate: dueIn(3),
    assignedTo: "Unassigned",
    ...partial,
  };
  upsertTask(task);
  logAuditEvent({
    action: `${task.type} task created`,
    target: `${task.id} → ${task.assignedTo}`,
    recordId: task.requestId,
  });
  return task;
}

// Auto-create tasks when a request is submitted, based on risk + answers.
export function createTasksForSubmission(req, answers = {}) {
  const created = [];
  const meta = { requestId: req.id, requestTitle: req.title };
  const risk = req.risk || "Low";

  if (risk === "High") {
    created.push(
      createTask({
        ...meta,
        type: "Legal Review",
        assignedTo: "Alex Kim",
        priority: "High",
        dueDate: dueIn(1),
      })
    );
    if (
      answers.pii ||
      answers.crossBorder ||
      answers.employeeData ||
      answers.customerData
    ) {
      created.push(
        createTask({
          ...meta,
          type: "Privacy Review",
          assignedTo: "Privacy Office",
          priority: "Critical",
          dueDate: dueIn(2),
        })
      );
    }
    created.push(
      createTask({
        ...meta,
        type: "Business Approval",
        assignedTo: req.owner || "Sara Patel",
        priority: "High",
        dueDate: dueIn(3),
      })
    );
  } else if (risk === "Medium") {
    created.push(
      createTask({
        ...meta,
        type: "Legal Review",
        assignedTo: "Alex Kim",
        priority: "Medium",
        dueDate: dueIn(2),
      })
    );
    created.push(
      createTask({
        ...meta,
        type: "Business Approval",
        assignedTo: req.owner || "Sara Patel",
        priority: "Medium",
        dueDate: dueIn(3),
      })
    );
  } else {
    created.push(
      createTask({
        ...meta,
        type: "Business Approval",
        assignedTo: req.owner || "Sara Patel",
        priority: "Low",
        dueDate: dueIn(2),
      })
    );
  }
  return created;
}

export function setTaskStatus(taskId, status, note = "") {
  const list = read(TASK_KEY, seedTasks);
  const idx = list.findIndex((t) => t.id === taskId);
  if (idx < 0) return null;
  list[idx] = { ...list[idx], status, updatedAt: Date.now() };
  write(TASK_KEY, list);
  logAuditEvent({
    action: `Task ${status}`,
    target: list[idx].type + (note ? ` (${note})` : ""),
    recordId: list[idx].requestId,
  });
  return list[idx];
}

export function reassignTask(taskId, assignedTo) {
  const list = read(TASK_KEY, seedTasks);
  const idx = list.findIndex((t) => t.id === taskId);
  if (idx < 0) return null;
  list[idx] = { ...list[idx], assignedTo, updatedAt: Date.now() };
  write(TASK_KEY, list);
  logAuditEvent({
    action: `Task reassigned`,
    target: `${list[idx].type} → ${assignedTo}`,
    recordId: list[idx].requestId,
  });
  return list[idx];
}

// ---- derived metrics ----
export function getStatusCounts() {
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0]));
  for (const r of getRequests()) {
    if (counts[r.status] !== undefined) counts[r.status]++;
  }
  return counts;
}

export function getTaskCounts() {
  const list = getTasks();
  return {
    total: list.length,
    open: list.filter((t) => t.status === "Open" || t.status === "In Progress").length,
    overdue: list.filter((t) => t.status === "Overdue").length,
    completed: list.filter((t) => t.status === "Completed").length,
  };
}

export function getHighRiskCount() {
  return getRequests().filter((r) => r.risk === "High").length;
}

export function getRecordTypeCounts() {
  const counts = Object.fromEntries(RECORD_TYPES.map((t) => [t, 0]));
  for (const r of getRequests()) {
    const k = r.recordType || "Non-Disclosure Agreement (NDA)";
    if (counts[k] === undefined) counts[k] = 0;
    counts[k]++;
  }
  return counts;
}

export function getRequestsByStatus(status) {
  return getRequests().filter((r) => r.status === status);
}

export function getRequestsByRecordType(recordType) {
  return getRequests().filter(
    (r) => (r.recordType || "Non-Disclosure Agreement (NDA)") === recordType
  );
}
