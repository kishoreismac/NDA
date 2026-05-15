"use client";
import { applyPlaceholders } from "@/lib/placeholders";

// Renders a template's structured content as HTML, with placeholders
// either highlighted (mode="raw") or substituted with values (mode="filled").
// Original formatting, headings, numbering, and signature blocks are preserved.
export default function TemplatePreview({
  template,
  values = {},
  mode = "raw", // "raw" | "filled"
  className = "",
}) {
  if (!template) {
    return (
      <div className="p-6 text-sm text-slate-400">No template selected.</div>
    );
  }

  const renderText = (text) => {
    if (!text) return null;
    if (mode === "filled") {
      // Highlight any placeholders that are still missing
      const parts = text.split(/(\{\{[A-Za-z0-9_]+\}\})/g);
      return parts.map((p, i) => {
        const m = /^\{\{([A-Za-z0-9_]+)\}\}$/.exec(p);
        if (m) {
          const key = m[1];
          const v = values[key];
          if (v) return <span key={i}>{v}</span>;
          return (
            <span
              key={i}
              className="px-1 rounded bg-rose-500/20 text-rose-200 border border-rose-400/40 font-mono text-[12px]"
              title="Missing value"
            >
              {p}
            </span>
          );
        }
        return <span key={i}>{p}</span>;
      });
    }
    // raw mode — highlight every placeholder
    const parts = text.split(/(\{\{[A-Za-z0-9_]+\}\})/g);
    return parts.map((p, i) => {
      if (/^\{\{[A-Za-z0-9_]+\}\}$/.test(p)) {
        return (
          <span
            key={i}
            className="px-1.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-200 border border-indigo-400/30 font-mono text-[12px] mx-0.5"
          >
            {p}
          </span>
        );
      }
      return <span key={i}>{p}</span>;
    });
  };

  const renderSig = (p, idx) => (
    <div
      key={idx}
      className="mt-6 p-4 rounded-lg border border-slate-200/60 bg-slate-50"
    >
      <div className="font-semibold text-slate-800 text-sm mb-3">
        {renderText(p.party)}
      </div>
      <div className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
        <div>By: <span className="text-slate-400">____________________________________</span></div>
        <div>Name: {renderText(p.name)}</div>
        {p.title && <div>Title: {renderText(p.title)}</div>}
        <div>Date: <span className="text-slate-400">__________________________</span></div>
      </div>
    </div>
  );

  return (
    <div
      className={`bg-white text-slate-800 rounded-xl shadow-2xl overflow-hidden ${className}`}
    >
      {/* Letterhead */}
      <div className="px-10 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
          {values.CompanyName || "Company"}
        </div>
        <div className="text-[11px] text-slate-500">
          {template.name} · {template.version}
        </div>
      </div>

      {/* Body */}
      <div className="px-10 py-10 max-h-[640px] overflow-auto">
        {template.content.map((block, i) => {
          if (block.type === "title") {
            return (
              <h1
                key={i}
                className="text-center text-2xl font-bold tracking-wide text-slate-900 mb-3"
              >
                {renderText(block.text)}
              </h1>
            );
          }
          if (block.type === "subtitle") {
            return (
              <div
                key={i}
                className="text-center italic text-slate-500 mb-6 text-sm"
              >
                {renderText(block.text)}
              </div>
            );
          }
          if (block.type === "heading") {
            return (
              <h2
                key={i}
                className="text-base font-bold text-slate-900 mt-6 mb-2"
              >
                {renderText(block.text)}
              </h2>
            );
          }
          if (block.type === "paragraph") {
            return (
              <p
                key={i}
                className="text-[13.5px] leading-7 text-slate-800 text-justify mb-3"
              >
                {renderText(block.text)}
              </p>
            );
          }
          if (block.type === "spacer") {
            return <div key={i} className="h-4" />;
          }
          if (block.type === "signatureBlock") {
            return (
              <div key={i}>
                <p className="text-[13.5px] leading-7 text-slate-800 mt-4">
                  IN WITNESS WHEREOF, the Parties hereto have executed this
                  Agreement as of the Effective Date.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {block.parties.map((p, idx) => renderSig(p, idx))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Footer */}
      <div className="px-10 py-2 border-t border-slate-200 bg-slate-50/80 text-[10px] text-slate-500 flex items-center justify-between">
        <span>Generated by NDAFlow · Template-based · No AI rewriting</span>
        <span>{template.id} · {template.version}</span>
      </div>
    </div>
  );
}
