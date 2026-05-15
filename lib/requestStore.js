// Request + task store backed by localStorage. Demo persistence.
// Provides the full status workflow + automatic task creation.

import { logAuditEvent } from "./auditTrail";

const REQ_KEY = "ndaflow.requests.v1";
const TASK_KEY = "ndaflow.tasks.v1";

// ---- canonical statuses ----
export const STATUSES = [
  "Draft",
  "Submitted",
  "In Review",
  "Legal Review",
  "Privacy Review",
  "Approved",
  "Awaiting Signature",
  "Signed",
  "Rejected",
  "Cancelled",
];

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
    form: { counterpartyName: "Acme Robotics Inc.", recordTitle: "Acme Robotics — Joint R&D" },
  },
  {
    id: "NDA-2040",
    title: "Northwind Pharma — Clinical Data",
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
    form: {},
  },
  {
    id: "NDA-2039",
    title: "Hooli Cloud — Hosting Eval",
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
    form: {},
  },
  {
    id: "NDA-2038",
    title: "Wayne Ent. — JV Exploration",
    type: "M&A",
    risk: "High",
    status: "Legal Review",
    owner: "Alex Kim",
    counterparty: "Wayne Enterprises",
    templateId: "tpl-international",
    createdAt: Date.now() - 1000 * 60 * 60 * 60,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24,
    riskScore: 79,
    workflowSteps: 5,
    form: {},
  },
  {
    id: "NDA-2037",
    title: "Initech — Beta Software",
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
    form: {},
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
    return [...seedRequests];
  }
  return [...list];
}

export function getRequest(id) {
  return getRequests().find((r) => r.id === id) || null;
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
  return merged;
}

export function deleteRequest(id) {
  const list = getRequests().filter((r) => r.id !== id);
  write(REQ_KEY, list);
}

export function setRequestStatus(id, status, note = "") {
  const r = getRequest(id);
  if (!r) return null;
  const updated = upsertRequest({ ...r, id, status });
  logAuditEvent({
    action: `Status → ${status}`,
    target: r.title + (note ? ` (${note})` : ""),
    recordId: id,
  });
  return updated;
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
