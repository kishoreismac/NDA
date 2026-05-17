"use client";
import { useEffect, useRef, useState } from "react";
import { ROLES, getCurrentRole, setCurrentRole } from "@/lib/roleStore";
import { useToast } from "@/components/Toast";
import { ChevronDown, Check, ShieldCheck, Briefcase, Scale, Eye } from "lucide-react";

const ROLE_ICON = {
  business: Briefcase,
  legal: Scale,
  admin: ShieldCheck,
  exec: Eye,
};

const ROLE_COLOR = {
  business: "from-violet-500 to-fuchsia-500",
  legal: "from-cyan-500 to-blue-500",
  admin: "from-emerald-500 to-teal-500",
  exec: "from-amber-500 to-orange-500",
};

export default function RoleSelector() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [{ role, user }, setSel] = useState(() => getCurrentRole());
  const ref = useRef(null);

  useEffect(() => {
    const refresh = () => setSel(getCurrentRole());
    window.addEventListener("clm:role-changed", refresh);
    return () => window.removeEventListener("clm:role-changed", refresh);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const choose = (newRole, newUser) => {
    setCurrentRole(newRole.id, newUser.id);
    setSel({ role: newRole, user: newUser });
    setOpen(false);
    toast.success(
      "Role switched",
      `${newUser.name} · ${newRole.label}`
    );
  };

  const Icon = ROLE_ICON[role.id] || Briefcase;
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
      >
        <div
          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ROLE_COLOR[role.id]} grid place-items-center text-sm font-bold text-white`}
        >
          {initials}
        </div>
        <div className="hidden md:block leading-tight pr-1 text-left">
          <div className="text-sm font-semibold text-white">{user.name}</div>
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Icon className="w-2.5 h-2.5" /> {role.label}
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 mr-1" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[360px] bg-navy-950 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-violet-500/10 to-cyan-500/10">
            <div className="text-sm font-semibold text-white">Select a Demo Role</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              This MVP uses session-based roles. Pick a role and a user to act as.
            </div>
          </div>

          <div className="p-3">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
              Demo Role
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {ROLES.map((r) => {
                const RIcon = ROLE_ICON[r.id];
                const active = r.id === role.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => choose(r, r.users[0])}
                    className={`text-left rounded-xl p-2.5 border transition ${
                      active
                        ? `bg-gradient-to-br ${ROLE_COLOR[r.id]} border-white/30 shadow-glow`
                        : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <RIcon className="w-3.5 h-3.5 text-white" />
                      <span className="text-xs font-semibold text-white">{r.label}</span>
                      {active && <Check className="w-3 h-3 text-white ml-auto" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">
              Demo User
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {role.users.map((u) => {
                const active = u.id === user.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => choose(role, u)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition ${
                      active ? "bg-white/[0.08]" : "hover:bg-white/[0.05]"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ROLE_COLOR[role.id]} grid place-items-center text-xs font-bold text-white`}
                    >
                      {u.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{u.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{u.title}</div>
                    </div>
                    {active && <Check className="w-3.5 h-3.5 text-cyanglow" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 px-2 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-slate-300">
              {role.desc}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
