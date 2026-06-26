// @ts-nocheck
// User directory with localStorage persistence. Seeded with US-based
// names. Used by Admin → Settings → Users & Roles.
"use client";

const KEY = "clm.users.v1";

export const DEFAULT_USERS = [
  {
    id: "u-001",
    title: "Ms.",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "Legal Ops Lead",
    email: "sarah.johnson@contoso.com",
  },
  {
    id: "u-002",
    title: "Mr.",
    firstName: "Michael",
    lastName: "Davis",
    role: "Senior Counsel",
    email: "michael.davis@contoso.com",
  },
  {
    id: "u-003",
    title: "Ms.",
    firstName: "Emily",
    lastName: "Rodriguez",
    role: "Paralegal",
    email: "emily.rodriguez@contoso.com",
  },
  {
    id: "u-004",
    title: "Mr.",
    firstName: "Robert",
    lastName: "Anderson",
    role: "Chief Legal Officer",
    email: "robert.anderson@contoso.com",
  },
  {
    id: "u-005",
    title: "Mrs.",
    firstName: "Jessica",
    lastName: "Williams",
    role: "Privacy Officer",
    email: "jessica.williams@contoso.com",
  },
  {
    id: "u-006",
    title: "Mr.",
    firstName: "James",
    lastName: "Miller",
    role: "Business Lead",
    email: "james.miller@contoso.com",
  },
];

function fullName(u) {
  return [u.title, u.firstName, u.lastName].filter(Boolean).join(" ");
}

export function listUsers() {
  if (typeof window === "undefined") return DEFAULT_USERS.map((u) => ({ ...u, name: fullName(u) }));
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : DEFAULT_USERS;
    return list.map((u) => ({ ...u, name: fullName(u) }));
  } catch {
    return DEFAULT_USERS.map((u) => ({ ...u, name: fullName(u) }));
  }
}

export function saveUsers(list) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent("clm:users-changed"));
  } catch {}
}

export function addUser({ title, firstName, lastName, role, email }) {
  const list = listUsers().map(({ name, ...u }) => u);
  const id = "u-" + Math.random().toString(36).slice(2, 8);
  const next = [
    ...list,
    {
      id,
      title: (title || "").trim(),
      firstName: (firstName || "").trim(),
      lastName: (lastName || "").trim(),
      role: (role || "Business User").trim(),
      email: (email || "").trim(),
    },
  ];
  saveUsers(next);
  return id;
}

export function removeUser(id) {
  const list = listUsers().map(({ name, ...u }) => u).filter((u) => u.id !== id);
  saveUsers(list);
}
