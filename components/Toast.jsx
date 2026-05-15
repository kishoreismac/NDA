"use client";
// Tiny toast notification system. No external deps.
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Info, X, XCircle } from "lucide-react";

const ToastCtx = createContext(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    // Safe no-op fallback if used outside provider
    return {
      toast: () => {},
      success: () => {},
      error: () => {},
      info: () => {},
      warning: () => {},
    };
  }
  return ctx;
}

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const remove = useCallback((id) => {
    setItems((arr) => arr.filter((i) => i.id !== id));
  }, []);

  const push = useCallback(
    (variant, title, description, duration = 4200) => {
      const id = Math.random().toString(36).slice(2);
      setItems((arr) => [...arr, { id, variant, title, description }]);
      if (duration > 0) {
        setTimeout(() => remove(id), duration);
      }
      return id;
    },
    [remove]
  );

  const api = {
    toast: (title, description) => push("info", title, description),
    success: (title, description) => push("success", title, description),
    error: (title, description) => push("error", title, description),
    info: (title, description) => push("info", title, description),
    warning: (title, description) => push("warning", title, description),
  };

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {items.map((t) => (
          <ToastItem key={t.id} item={t} onClose={() => remove(t.id)} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function ToastItem({ item, onClose }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);
  const variants = {
    success: {
      icon: CheckCircle2,
      ring: "ring-emerald-400/30",
      bar: "bg-emerald-400",
      iconColor: "text-emerald-300",
    },
    error: {
      icon: XCircle,
      ring: "ring-rose-400/30",
      bar: "bg-rose-400",
      iconColor: "text-rose-300",
    },
    warning: {
      icon: AlertTriangle,
      ring: "ring-amber-400/30",
      bar: "bg-amber-400",
      iconColor: "text-amber-300",
    },
    info: {
      icon: Info,
      ring: "ring-cyan-400/30",
      bar: "bg-cyan-400",
      iconColor: "text-cyan-300",
    },
  };
  const v = variants[item.variant] || variants.info;
  const Icon = v.icon;
  return (
    <div
      className={
        "pointer-events-auto relative flex gap-3 items-start p-3.5 rounded-xl border border-white/10 bg-navy-900/95 backdrop-blur-md shadow-2xl ring-1 " +
        v.ring +
        " transition-all duration-200 " +
        (visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4")
      }
    >
      <div className={"absolute left-0 top-0 bottom-0 w-1 rounded-l-xl " + v.bar} />
      <Icon className={"w-5 h-5 mt-0.5 flex-shrink-0 " + v.iconColor} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white">{item.title}</div>
        {item.description && (
          <div className="text-xs text-slate-300 mt-0.5">{item.description}</div>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white transition flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
