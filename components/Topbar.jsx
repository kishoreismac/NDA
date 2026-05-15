"use client";
import { Bell, Search, ChevronDown } from "lucide-react";

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
            placeholder="Search NDAs, parties, clauses…"
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
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-lg bg-grad-primary grid place-items-center text-sm font-bold">
            SP
          </div>
          <div className="hidden md:block leading-tight pr-1">
            <div className="text-sm font-semibold">Sara Patel</div>
            <div className="text-[10px] text-slate-400">Legal Ops Lead</div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 mr-1" />
        </div>
      </div>
    </header>
  );
}
