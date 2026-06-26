// @ts-nocheck
"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard, SectionTitle } from "@/components/ui";
import { getTasks } from "@/lib/requestStore";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  useEffect(() => setMounted(true), []);

  const tasks = useMemo(() => (mounted ? getTasks() : []), [mounted]);

  const events = useMemo(() => {
    const map = {};
    for (const t of tasks) {
      if (!t.dueDate) continue;
      const d = new Date(t.dueDate);
      if (d.getFullYear() === cursor.y && d.getMonth() === cursor.m) {
        const k = d.getDate();
        (map[k] = map[k] || []).push(t);
      }
    }
    return map;
  }, [tasks, cursor]);

  const firstDay = new Date(cursor.y, cursor.m, 1).getDay();
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () =>
    setCursor((c) =>
      c.m === 0 ? { y: c.y - 1, m: 11 } : { y: c.y, m: c.m - 1 }
    );
  const next = () =>
    setCursor((c) =>
      c.m === 11 ? { y: c.y + 1, m: 0 } : { y: c.y, m: c.m + 1 }
    );

  const today = new Date();
  const isToday = (d) =>
    d &&
    today.getFullYear() === cursor.y &&
    today.getMonth() === cursor.m &&
    today.getDate() === d;

  return (
    <>
      <Topbar
        title="Calendar"
        subtitle="Contract milestones, task due dates, renewals and signature deadlines."
      />

      <GlassCard>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-cyanglow" />
            <div className="text-xl font-bold text-white">
              {MONTHS[cursor.m]} {cursor.y}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="btn-ghost !p-2">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const d = new Date();
                setCursor({ y: d.getFullYear(), m: d.getMonth() });
              }}
              className="btn-ghost text-xs"
            >
              Today
            </button>
            <button onClick={next} className="btn-ghost !p-2">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-[10px] uppercase tracking-wider text-slate-400 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="px-2 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => (
            <div
              key={i}
              className={`min-h-[96px] rounded-lg border p-2 ${
                d
                  ? isToday(d)
                    ? "bg-grad-soft border-cyanglow/40"
                    : "bg-white/[0.03] border-white/5"
                  : "border-transparent"
              }`}
            >
              {d && (
                <>
                  <div
                    className={`text-xs font-semibold mb-1 ${
                      isToday(d) ? "text-cyanglow" : "text-slate-300"
                    }`}
                  >
                    {d}
                  </div>
                  <div className="space-y-1">
                    {(events[d] || []).slice(0, 3).map((t) => (
                      <button
                        key={t.id}
                        onClick={() =>
                          router.push(
                            `/repository?open=${encodeURIComponent(t.requestId)}`
                          )
                        }
                        className={`block w-full text-left text-[10px] px-1.5 py-1 rounded truncate ${
                          t.status === "Overdue"
                            ? "bg-rose-500/15 text-rose-200"
                            : t.priority === "High" || t.priority === "Critical"
                            ? "bg-amber-500/15 text-amber-200"
                            : "bg-cyan-500/15 text-cyan-200"
                        }`}
                        title={`${t.type} · ${t.requestTitle}`}
                      >
                        <Clock className="w-2.5 h-2.5 inline mr-1" />
                        {t.type}
                      </button>
                    ))}
                    {(events[d] || []).length > 3 && (
                      <div className="text-[9px] text-slate-400">
                        +{(events[d] || []).length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
}
