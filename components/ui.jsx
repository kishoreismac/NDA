import clsx from "clsx";

export function GlassCard({ className, children, ...props }) {
  return (
    <div className={clsx("glass p-5", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, delta, icon: Icon, accent = "indigo" }) {
  const grad = {
    indigo: "from-indigo-500/30 to-violet-500/10",
    cyan: "from-cyan-500/30 to-indigo-500/10",
    pink: "from-pink-500/30 to-violet-500/10",
    emerald: "from-emerald-500/30 to-cyan-500/10",
  }[accent];
  return (
    <div className="glass p-5 relative overflow-hidden">
      <div
        className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${grad} blur-2xl pointer-events-none`}
      />
      <div className="flex items-center justify-between relative">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400">
            {label}
          </div>
          <div className="text-3xl font-bold text-white mt-1.5 tracking-tight">
            {value}
          </div>
          {delta && (
            <div className="text-xs text-emerald-300 mt-1.5 font-medium">
              {delta}
            </div>
          )}
        </div>
        {Icon && (
          <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
            <Icon className="w-5 h-5 text-slate-200" />
          </div>
        )}
      </div>
    </div>
  );
}

export function RiskBadge({ level }) {
  const map = {
    Low: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    Medium: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    High: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${map[level] || map.Low}`}>
      {level}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    "In Review": "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
    Approved: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    "Awaiting Signature": "bg-amber-500/15 text-amber-300 border-amber-400/30",
    Signed: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
    Archived: "bg-slate-500/15 text-slate-300 border-slate-400/30",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${map[status] || map["In Review"]}`}>
      {status}
    </span>
  );
}
