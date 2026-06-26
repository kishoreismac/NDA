// @ts-nocheck
// Role + demo-user selector. Persisted to localStorage.
const KEY = "clm.role.v1";

export const ROLES = [
  {
    id: "business",
    label: "Business User",
    desc: "Submit contract requests, generate drafts, run AI risk review.",
    perms: { canRequest: true, canApprove: false, canAdmin: false, canEdit: true, canDelete: false },
    users: [
      { id: "sarah",  name: "Sarah Johnson",   title: "Business Lead" },
      { id: "emily",  name: "Emily Rodriguez", title: "Procurement Manager" },
      { id: "james",  name: "James Miller",    title: "Sales Director" },
    ],
  },
  {
    id: "legal",
    label: "Legal Reviewer",
    desc: "Approve, reject, request changes, send for signature.",
    perms: { canRequest: true, canApprove: true, canAdmin: false, canEdit: true, canDelete: false },
    users: [
      { id: "michael", name: "Michael Davis",    title: "Senior Counsel" },
      { id: "jessica", name: "Jessica Williams", title: "Privacy Counsel" },
      { id: "robert",  name: "Robert Anderson",  title: "Chief Legal Officer" },
    ],
  },
  {
    id: "admin",
    label: "Admin",
    desc: "Access all actions including archive, delete and rules engine.",
    perms: { canRequest: true, canApprove: true, canAdmin: true, canEdit: true, canDelete: true },
    users: [
      { id: "admin1", name: "David Thompson", title: "Legal Ops Admin" },
      { id: "admin2", name: "Amanda Wilson",  title: "System Administrator" },
    ],
  },
  {
    id: "exec",
    label: "Executive Viewer",
    desc: "Read-only dashboard and tracker.",
    perms: { canRequest: false, canApprove: false, canAdmin: false, canEdit: false, canDelete: false },
    users: [
      { id: "ceo",  name: "Patricia Martinez", title: "Chief Executive Officer" },
      { id: "clo",  name: "Christopher Brown", title: "Chief Legal Officer" },
    ],
  },
];

export function getCurrentRole() {
  if (typeof window === "undefined") return { role: ROLES[0], user: ROLES[0].users[0] };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const { roleId, userId } = JSON.parse(raw);
      const role = ROLES.find((r) => r.id === roleId) || ROLES[0];
      const user = role.users.find((u) => u.id === userId) || role.users[0];
      return { role, user };
    }
  } catch {}
  return { role: ROLES[0], user: ROLES[0].users[0] };
}

export function setCurrentRole(roleId, userId) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ roleId, userId }));
    window.dispatchEvent(new CustomEvent("clm:role-changed"));
  } catch {}
}
