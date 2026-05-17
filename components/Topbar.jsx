"use client";
import { Bell, Search } from "lucide-react";
import RoleSelector from "@/components/RoleSelector";

export default function Topbar({ title, subtitle, actions }) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-400 mt-1.5 max-w-2xl">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-72">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            placeholder="Search contracts, parties, clauses…"
            className="bg-transparent outline-none text-sm flex-1 placeholder-slate-500"
          />
        </div>
        <button className="btn-ghost relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold grid place-items-center bg-grad-primary">
            3
          </span>
        </button>
        {actions}
        <RoleSelector />
      </div>
    </header>
  );
}
