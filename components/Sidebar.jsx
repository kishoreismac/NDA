"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FilePlus2,
  Scale,
  Database,
  Users,
  GitBranch,
  FileText,
  Settings,
  Sparkles,
  ListChecks,
  Calendar,
  BarChart3,
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/requests/new", label: "New Contract Request", icon: FilePlus2 },
  { href: "/legal-queue", label: "Legal Review Queue", icon: Scale },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/repository", label: "Repository", icon: Database },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/parties", label: "Parties", icon: Users },
  { href: "/rules", label: "Rules", icon: GitBranch },
  { href: "/templates", label: "Templates", icon: FileText },
  { href: "/admin", label: "Admin Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 px-4 py-6 border-r border-white/5 bg-navy-950/60 backdrop-blur-xl">
      <Link href="/dashboard" className="flex items-center gap-2.5 px-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-grad-primary grid place-items-center shadow-glow">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="leading-tight">
          <div className="font-bold text-white text-lg tracking-tight">CLM</div>
          <div className="text-[10px] uppercase tracking-[0.2em] gradient-text font-semibold">
            Contract Lifecycle
          </div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${active ? "nav-link-active" : ""}`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto glass p-4">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-cyanglow" />
          <span className="font-semibold gradient-text">AI Copilot</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
          Request, draft, review, sign, store, search and renew — across NDA, MSA, SOW, vendor & more.
        </p>
      </div>
    </aside>
  );
}
