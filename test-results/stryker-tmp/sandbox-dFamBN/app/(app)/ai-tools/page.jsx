// @ts-nocheck
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/Topbar";
import { GlassCard, RiskBadge, StatusBadge } from "@/components/ui";
import { useToast } from "@/components/Toast";
import {
  Sparkles,
  Upload,
  ScanText,
  ShieldCheck,
  MessageSquare,
  Wand2,
  AlertTriangle,
  CheckCircle2,
  Send,
  FileText,
  Loader2,
  Copy,
  Bot,
  User as UserIcon,
} from "lucide-react";
import { extractContractData } from "@/lib/aiExtract";
import { analyzeContract } from "@/lib/aiAnalysis";
import { answer as chatAnswer, SUGGESTED_PROMPTS } from "@/lib/aiChat";
import { suggestClause, CLAUSE_LIBRARY } from "@/lib/aiClauses";
import { upsertRequest, newRequestId, getRequests } from "@/lib/requestStore";
import { logAuditEvent } from "@/lib/auditTrail";
import { renderRecordAsText } from "@/lib/aiRepo";

const TABS = [
  { id: "extract", label: "Extract Data", icon: ScanText },
  { id: "review", label: "Review & Risk", icon: ShieldCheck },
  { id: "chat", label: "Repository Q&A", icon: MessageSquare },
  { id: "clauses", label: "Clause Suggestions", icon: Wand2 },
];

export default function AiToolsPage() {
  const [tab, setTab] = useState("extract");
  return (
    <div>
      <Topbar title="AI Search" subtitle="Extract · Review · Chat · Redline" />
      <div className="px-6 lg:px-8 pt-4 pb-10 space-y-6">
        <GlassCard className="!p-0 overflow-hidden">
          <div className="flex flex-wrap gap-1 p-1.5">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  data-testid={`ai-search-tab-${t.id}`}
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={
                    "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition " +
                    (active
                      ? "bg-grad-primary text-white shadow-glow"
                      : "text-slate-300 hover:bg-white/5")
                  }
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {tab === "extract" && <ExtractTab />}
        {tab === "review" && <ReviewTab />}
        {tab === "chat" && <ChatTab />}
        {tab === "clauses" && <ClauseTab />}
      </div>
    </div>
  );
}

/* ----------------------- shared: repository picker ----------------------- */
function RepositoryPicker({ value, onPick, onClear }) {
  const [records, setRecords] = useState([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    setRecords(getRequests());
  }, []);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return records.slice(0, 50);
    return records
      .filter((r) =>
        [r.id, r.title, r.counterparty, r.form?.counterpartyName, r.owner, r.type]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(s)
      )
      .slice(0, 50);
  }, [records, q]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-wider text-slate-400">
          Select from Repository
        </div>
        {value && (
          <button
            onClick={onClear}
            className="text-[11px] text-rose-300 hover:underline"
          >
            Clear selection
          </button>
        )}
      </div>
      {value ? (
        <div className="flex items-center justify-between bg-cyan-500/10 border border-cyan-400/30 rounded-lg px-3 py-2">
          <div className="min-w-0">
            <div className="text-xs text-cyan-100 font-mono">{value.id}</div>
            <div className="text-sm text-white truncate">{value.title}</div>
            <div className="text-[11px] text-slate-400 truncate">
              {value.counterparty || value.form?.counterpartyName || "—"} ·{" "}
              {value.type} · {value.status}
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
        </div>
      ) : (
        <>
          <input
            data-testid="ai-repository-picker-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search NDAs by ID, counterparty, owner…"
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400/40"
          />
          <div className="max-h-44 overflow-y-auto space-y-1 pr-1">
            {filtered.length === 0 ? (
              <div className="text-[11px] text-slate-500 px-2 py-3 text-center">
                No matching NDAs.
              </div>
            ) : (
              filtered.map((r) => (
                <button
                  data-testid="ai-repository-picker-option"
                  key={r.id}
                  onClick={() => onPick(r)}
                  className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2.5 py-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-300">
                      {r.id}
                    </span>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="text-xs text-white truncate">{r.title}</div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {r.counterparty || r.form?.counterpartyName || "—"} · {r.type}
                  </div>
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ----------------------- helper: read file as text ----------------------- */
async function readFileAsText(file) {
  // Accept .txt / .md / .html / .json. For PDF/DOCX we ask the user to paste.
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsText(file);
  });
}

/* ============================== EXTRACT TAB ============================== */
function ExtractTab() {
  const router = useRouter();
  const toast = useToast();
  const fileRef = useRef(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [picked, setPicked] = useState(null);

  const onPickRecord = (rec) => {
    const rendered = renderRecordAsText(rec);
    setPicked(rec);
    setText(rendered);
    setResult(null);
    // Auto-run extraction
    setBusy(true);
    setTimeout(() => {
      const res = extractContractData(rendered);
      setResult(res);
      setBusy(false);
      logAuditEvent({
        action: "AI extract — from repository record",
        target: rec.id,
        recordId: rec.id,
      });
    }, 250);
  };

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/\.(txt|md|html?|json)$/i.test(f.name)) {
      toast.warning(
        "Unsupported file",
        "Please paste PDF/DOCX content as text, or upload .txt / .md / .html."
      );
      return;
    }
    const t = await readFileAsText(f);
    setText(t);
    toast.success("File loaded", `${f.name} · ${t.length.toLocaleString()} chars`);
  };

  const run = () => {
    if (!text.trim()) {
      toast.warning("Nothing to extract", "Paste contract text first.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      const res = extractContractData(text);
      setResult(res);
      setBusy(false);
      logAuditEvent({
        action: "AI extract — contract data",
        target: `${res.wordCount} words · ${res.confidence}% confidence`,
      });
    }, 300);
  };

  const createRecord = () => {
    if (!result) return;
    const id = newRequestId();
    const f = result.fields;
    upsertRequest({
      id,
      title: `${f.counterpartyName || "Imported NDA"} — Imported`,
      type: f.type || "Mutual",
      risk: "Medium",
      status: "In Review",
      owner: "AI Import",
      counterparty: f.counterpartyName || "",
      templateId: "tpl-mutual",
      form: {
        counterpartyName: f.counterpartyName,
        counterpartyAddress: f.counterpartyAddress,
        counterpartyEmail: f.counterpartyEmail,
        companyName: f.companyName || "Contoso Corporation",
        companyAddress: f.companyAddress,
        effectiveDate: f.effectiveDate,
        term: f.term,
        survival: f.survival,
        governingLaw: f.governingLaw,
        jurisdiction: f.jurisdiction,
        purpose: f.purpose,
      },
    });
    logAuditEvent({
      action: "AI extract — record created",
      target: id,
      recordId: id,
    });
    toast.success("NDA record created", `${id} added to repository`);
    router.push(`/repository?open=${id}`);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <GlassCard className="!p-5 space-y-4">
        <div className="flex items-center gap-2 text-white">
          <ScanText className="w-4 h-4 text-cyanglow" />
          <h3 className="font-semibold">Contract Data Extraction</h3>
        </div>
        <p className="text-xs text-slate-400">
          Select an existing NDA from the repository, or paste a third-party /
          legacy NDA below. The AI extractor pulls counterparty, dates, term,
          governing law, and other key fields.
        </p>
        <RepositoryPicker
          value={picked}
          onPick={onPickRecord}
          onClear={() => {
            setPicked(null);
            setText("");
            setResult(null);
          }}
        />
        <div className="flex gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-ghost text-xs"
          >
            <Upload className="w-3.5 h-3.5" /> Upload .txt
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".txt,.md,.html,.htm,.json"
            className="hidden"
            onChange={onFile}
          />
          <button
            onClick={() => setText(SAMPLE_NDA)}
            className="btn-ghost text-xs"
          >
            <FileText className="w-3.5 h-3.5" /> Load sample NDA
          </button>
          <button
            onClick={() => {
              setText("");
              setResult(null);
              setPicked(null);
            }}
            className="btn-ghost text-xs text-rose-300"
          >
            Clear
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={16}
          placeholder="Paste the full text of the NDA here…"
          className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-slate-200 font-mono outline-none focus:border-cyan-400/40"
        />
        <div className="flex justify-end">
          <button
            onClick={run}
            disabled={busy}
            className="inline-flex items-center gap-2 bg-grad-primary text-white px-4 py-2 rounded-xl text-sm shadow-glow disabled:opacity-50"
          >
            {busy ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Extract Data
          </button>
        </div>
      </GlassCard>

      <GlassCard className="!p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="w-4 h-4 text-violet-300" />
            <h3 className="font-semibold">Extracted Fields</h3>
          </div>
          {result && (
            <span className="text-[11px] text-slate-400">
              Confidence{" "}
              <span className="text-white font-medium">
                {result.confidence}%
              </span>{" "}
              · {result.wordCount} words
            </span>
          )}
        </div>
        {!result ? (
          <div className="text-xs text-slate-400 py-12 text-center border border-dashed border-white/10 rounded-xl">
            Run an extraction to see structured contract data here.
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(result.fields).map(([k, v]) => (
                <div
                  key={k}
                  className="bg-white/5 border border-white/10 rounded-lg p-3"
                >
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    {humanize(k)}
                  </div>
                  <div className="text-white text-sm mt-0.5 break-words">
                    {v || <span className="text-slate-500">—</span>}
                  </div>
                </div>
              ))}
            </div>
            {result.findings.length > 0 && (
              <div className="mt-2 text-[11px] text-slate-400 space-y-1">
                {result.findings.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                    {f}
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end pt-2">
              <button
                onClick={createRecord}
                className="inline-flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-100 px-4 py-2 rounded-xl text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Create NDA Record from Extraction
              </button>
            </div>
          </>
        )}
      </GlassCard>
    </div>
  );
}

function humanize(k) {
  return k
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

/* ============================== REVIEW TAB ============================== */
function ReviewTab() {
  const toast = useToast();
  const [text, setText] = useState("");
  const [res, setRes] = useState(null);
  const [busy, setBusy] = useState(false);
  const [picked, setPicked] = useState(null);

  const run = () => {
    setBusy(true);
    setTimeout(() => {
      const r = analyzeContract(text);
      setBusy(false);
      if (!r.ok) {
        toast.warning("Cannot analyze", r.error);
        return;
      }
      setRes(r);
      logAuditEvent({
        action: "AI review — risk scored",
        target: `${r.riskLevel} (score ${r.score})`,
        recordId: picked?.id,
      });
    }, 300);
  };

  const onPickRecord = (rec) => {
    const rendered = renderRecordAsText(rec);
    setPicked(rec);
    setText(rendered);
    setRes(null);
    setBusy(true);
    setTimeout(() => {
      const r = analyzeContract(rendered);
      setBusy(false);
      if (r.ok) {
        setRes(r);
        logAuditEvent({
          action: "AI review — from repository record",
          target: `${rec.id} · ${r.riskLevel} (${r.score})`,
          recordId: rec.id,
        });
      }
    }, 250);
  };

  const scoreColor =
    res?.riskLevel === "Low"
      ? "text-emerald-300 border-emerald-400/40 bg-emerald-500/10"
      : res?.riskLevel === "Medium"
      ? "text-amber-300 border-amber-400/40 bg-amber-500/10"
      : "text-rose-300 border-rose-400/40 bg-rose-500/10";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <GlassCard className="!p-5 space-y-4">
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck className="w-4 h-4 text-cyanglow" />
          <h3 className="font-semibold">Automated Contract Review</h3>
        </div>
        <p className="text-xs text-slate-400">
          Select an existing NDA from the repository, or paste contract text to
          check for missing clauses, unusual terms, and risk flags. Each
          finding has a severity and a recommended fix.
        </p>
        <RepositoryPicker
          value={picked}
          onPick={onPickRecord}
          onClear={() => {
            setPicked(null);
            setText("");
            setRes(null);
          }}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setText(SAMPLE_NDA)}
            className="btn-ghost text-xs"
          >
            <FileText className="w-3.5 h-3.5" /> Load sample NDA
          </button>
          <button
            onClick={() => {
              setText("");
              setRes(null);
              setPicked(null);
            }}
            className="btn-ghost text-xs text-rose-300"
          >
            Clear
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={16}
          placeholder="Paste contract text to review…"
          className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-slate-200 font-mono outline-none focus:border-cyan-400/40"
        />
        <div className="flex justify-end">
          <button
            onClick={run}
            disabled={busy}
            className="inline-flex items-center gap-2 bg-grad-primary text-white px-4 py-2 rounded-xl text-sm shadow-glow disabled:opacity-50"
          >
            {busy ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4" />
            )}
            Run Review
          </button>
        </div>
      </GlassCard>

      <GlassCard className="!p-5 space-y-3">
        {!res ? (
          <div className="text-xs text-slate-400 py-12 text-center border border-dashed border-white/10 rounded-xl">
            Run a review to see risk score and findings.
          </div>
        ) : (
          <>
            <div className="flex items-stretch gap-3">
              <div
                className={
                  "flex-1 rounded-xl border p-4 text-center " + scoreColor
                }
              >
                <div className="text-[11px] uppercase tracking-wider opacity-80">
                  Risk Score
                </div>
                <div className="text-4xl font-bold mt-1">{res.score}</div>
                <div className="text-xs mt-1">/ 100</div>
              </div>
              <div
                className={
                  "flex-1 rounded-xl border p-4 text-center " + scoreColor
                }
              >
                <div className="text-[11px] uppercase tracking-wider opacity-80">
                  Risk Level
                </div>
                <div className="text-2xl font-bold mt-3">{res.riskLevel}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <Stat label="High" value={res.counts.high} color="rose" />
              <Stat label="Medium" value={res.counts.medium} color="amber" />
              <Stat label="Low" value={res.counts.low} color="cyan" />
            </div>
            <div className="text-[11px] text-slate-400">
              {res.findings.length} finding(s) across {res.checkedRules} rules ·{" "}
              {res.wordCount} words analyzed
            </div>
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {res.findings.length === 0 ? (
                <div className="text-center py-6 text-emerald-300 text-sm">
                  <CheckCircle2 className="w-6 h-6 mx-auto mb-1" />
                  No issues detected — contract passes all checks.
                </div>
              ) : (
                res.findings.map((f) => <Finding key={f.id} f={f} />)
              )}
            </div>
          </>
        )}
      </GlassCard>
    </div>
  );
}

function Stat({ label, value, color }) {
  const map = {
    rose: "border-rose-400/40 bg-rose-500/10 text-rose-200",
    amber: "border-amber-400/40 bg-amber-500/10 text-amber-200",
    cyan: "border-cyan-400/40 bg-cyan-500/10 text-cyan-200",
  };
  return (
    <div className={"rounded-lg border p-2 " + map[color]}>
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider opacity-80">
        {label}
      </div>
    </div>
  );
}

function Finding({ f }) {
  const sev =
    f.severity === "high"
      ? "border-rose-400/40 bg-rose-500/5"
      : f.severity === "medium"
      ? "border-amber-400/40 bg-amber-500/5"
      : "border-cyan-400/40 bg-cyan-500/5";
  const icon =
    f.severity === "high" ? (
      <AlertTriangle className="w-4 h-4 text-rose-300" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-amber-300" />
    );
  return (
    <div className={"rounded-lg border p-3 " + sev}>
      <div className="flex items-start gap-2">
        {icon}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white">{f.label}</div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
            {f.category} · {f.severity}
          </div>
          <div className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            {f.recommendation}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================== CHAT TAB =============================== */
function ChatTab() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text:
        "Hi — I'm your NDA assistant. Ask me anything about the portfolio or a specific NDA (e.g. \"Summary of NDA-2041\", \"When does Wayne NDA expire?\", \"Risk highlights for NDA-2037\").",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const send = (q) => {
    const text = (q ?? input).trim();
    if (!text) return;
    const a = chatAnswer(text);
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", ...a }]);
    setInput("");
  };

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-6">
      <GlassCard className="!p-0 overflow-hidden flex flex-col h-[640px]">
        <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2 text-white">
          <Bot className="w-4 h-4 text-cyanglow" />
          <h3 className="font-semibold">Repository Chatbot</h3>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.map((m, i) => (
            <Bubble key={i} m={m} />
          ))}
        </div>
        <div className="p-3 border-t border-white/10 flex gap-2">
          <input
            data-testid="ai-search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder='Ask about the portfolio or any specific NDA (e.g. "Summary of NDA-2041")'
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/40"
          />
          <button
            data-testid="ai-search-send"
            onClick={() => send()}
            className="inline-flex items-center gap-1.5 bg-grad-primary text-white px-4 py-2 rounded-xl text-sm shadow-glow"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </GlassCard>

      <GlassCard className="!p-4 space-y-2 h-fit">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
          Suggested prompts
        </div>
        {SUGGESTED_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            className="w-full text-left text-xs text-slate-200 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
          >
            {p}
          </button>
        ))}
      </GlassCard>
    </div>
  );
}

function Bubble({ m }) {
  if (m.role === "user") {
    return (
      <div className="flex items-start gap-2 justify-end">
        <div className="bg-grad-primary text-white text-sm px-3 py-2 rounded-xl rounded-tr-sm max-w-[80%]">
          {m.text}
        </div>
        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 grid place-items-center">
          <UserIcon className="w-3.5 h-3.5 text-slate-300" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/30 grid place-items-center">
        <Bot className="w-3.5 h-3.5 text-cyan-200" />
      </div>
      <div className="bg-white/5 border border-white/10 text-sm text-slate-200 px-3 py-2 rounded-xl rounded-tl-sm max-w-[85%] space-y-2">
        <div>{m.text}</div>
        {m.rows && m.rows.length > 0 && (
          <div className="overflow-x-auto -mx-1">
            <table className="text-[11px] w-full">
              <thead className="text-slate-400">
                <tr>
                  <th className="text-left px-1 py-1">ID</th>
                  <th className="text-left px-1 py-1">Title</th>
                  <th className="text-left px-1 py-1">Status</th>
                  <th className="text-left px-1 py-1">Risk</th>
                </tr>
              </thead>
              <tbody>
                {m.rows.map((r) => (
                  <tr key={r.id} className="border-t border-white/5">
                    <td className="px-1 py-1 font-mono text-slate-300">
                      {r.id}
                    </td>
                    <td className="px-1 py-1 text-white">{r.title}</td>
                    <td className="px-1 py-1">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-1 py-1">
                      <RiskBadge level={r.risk} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {m.owners && (
          <div className="grid grid-cols-2 gap-1">
            {m.owners.map((o) => (
              <div
                key={o.owner}
                className="flex justify-between bg-white/5 rounded px-2 py-1"
              >
                <span className="text-slate-300">{o.owner}</span>
                <span className="text-white font-semibold">{o.count}</span>
              </div>
            ))}
          </div>
        )}
        {m.types && (
          <div className="grid grid-cols-2 gap-1">
            {m.types.map((t) => (
              <div
                key={t.type}
                className="flex justify-between bg-white/5 rounded px-2 py-1"
              >
                <span className="text-slate-300">{t.type}</span>
                <span className="text-white font-semibold">{t.count}</span>
              </div>
            ))}
          </div>
        )}
        {m.stats && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <KV k="Total" v={m.stats.total} />
            <KV k="Signed" v={m.stats.signed} />
            <KV k="Awaiting Sig" v={m.stats.awaiting} />
            <KV k="In Review" v={m.stats.inReview} />
            <KV k="Approved" v={m.stats.approved} />
            <KV k="High Risk" v={m.stats.highRisk} />
          </div>
        )}
        {m.kind === "record" && m.record && <RecordSummaryCard r={m.record} />}
        {m.kind === "record-field" && m.record && (
          <div className="space-y-2">
            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                {m.label}
              </div>
              <div className="text-sm text-white mt-0.5 whitespace-pre-wrap">
                {m.value || "—"}
              </div>
            </div>
            <RecordMiniHeader r={m.record} />
          </div>
        )}
        {m.kind === "record-counterparty" && m.record && (
          <div className="space-y-2">
            <div className="grid sm:grid-cols-2 gap-2 text-xs">
              <KV k="Name" v={m.record.counterparty.name || "—"} />
              <KV k="Contact" v={m.record.counterparty.contact || "—"} />
              <KV k="Email" v={m.record.counterparty.email || "—"} />
              <KV k="Address" v={m.record.counterparty.address || "—"} />
            </div>
            <RecordMiniHeader r={m.record} />
          </div>
        )}
        {m.kind === "record-risk" && m.record && (
          <div className="space-y-2">
            {m.analysis ? (
              <>
                <div className="flex gap-2 text-xs">
                  <KV k="Score" v={`${m.analysis.score}/100`} />
                  <KV k="Level" v={m.analysis.riskLevel} />
                  <KV k="High" v={m.analysis.counts.high} />
                  <KV k="Med" v={m.analysis.counts.medium} />
                </div>
                {m.analysis.top.length > 0 && (
                  <div className="text-xs text-slate-300 space-y-1">
                    {m.analysis.top.map((t, i) => (
                      <div key={i}>{t}</div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-slate-400">
                Could not run risk analysis on this record.
              </div>
            )}
            <RecordMiniHeader r={m.record} />
          </div>
        )}
        {m.kind === "record-clauses" && m.record && (
          <div className="space-y-2">
            {m.clauses && m.clauses.length > 0 ? (
              m.clauses.map((c, i) => (
                <div
                  key={i}
                  className="text-xs text-slate-200 bg-black/30 border border-white/10 rounded-lg p-2 whitespace-pre-wrap font-mono leading-relaxed"
                >
                  {c}
                </div>
              ))
            ) : (
              <RecordSummaryCard r={m.record} />
            )}
            <RecordMiniHeader r={m.record} />
          </div>
        )}
        {m.kind === "record-text" && m.record && (
          <details className="text-xs">
            <summary className="cursor-pointer text-cyan-300">
              Show full rendered NDA text
            </summary>
            <pre className="mt-2 max-h-80 overflow-y-auto bg-black/30 border border-white/10 rounded-lg p-2 whitespace-pre-wrap font-mono text-[11px] text-slate-200">
              {m.body}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

function RecordMiniHeader({ r }) {
  return (
    <div className="flex items-center gap-2 text-[10px] text-slate-400 pt-1 border-t border-white/5">
      <span className="font-mono text-slate-300">{r.id}</span>
      <span>·</span>
      <span className="truncate">{r.title}</span>
      <span className="ml-auto">
        <StatusBadge status={r.status} />
      </span>
    </div>
  );
}

function RecordSummaryCard({ r }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[10px] font-mono text-slate-400">{r.id}</div>
          <div className="text-sm text-white truncate">{r.title}</div>
        </div>
        <div className="flex gap-1">
          <RiskBadge level={r.risk} />
          <StatusBadge status={r.status} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 text-xs">
        <KV k="Counterparty" v={r.counterparty.name || "—"} />
        <KV k="Type" v={r.type} />
        <KV k="Effective" v={r.effectiveDate || "—"} />
        <KV k="Term" v={r.term || "—"} />
        <KV k="Expiry" v={r.expiry || "—"} />
        <KV
          k="Days to Expiry"
          v={
            r.daysToExpiry === null
              ? "—"
              : r.daysToExpiry < 0
              ? `${Math.abs(r.daysToExpiry)} overdue`
              : `${r.daysToExpiry}`
          }
        />
        <KV k="Governing Law" v={r.governingLaw || "—"} />
        <KV k="Jurisdiction" v={r.jurisdiction || "—"} />
        <KV k="Signature" v={r.signatureStatus} />
        <KV k="Owner" v={r.owner || "—"} />
      </div>
      {r.purpose && (
        <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">
            Purpose
          </div>
          <div className="text-xs text-slate-200 mt-0.5">{r.purpose}</div>
        </div>
      )}
      {r.renewalDue && (
        <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2">
          ⚠ Renewal due — expires in {r.daysToExpiry} day(s) on {r.expiry}.
        </div>
      )}
    </div>
  );
}
function KV({ k, v }) {
  return (
    <div className="bg-white/5 rounded px-2 py-1 flex justify-between">
      <span className="text-slate-400">{k}</span>
      <span className="text-white font-semibold">{v}</span>
    </div>
  );
}

/* ============================== CLAUSE TAB ============================== */
function ClauseTab() {
  const toast = useToast();
  const [text, setText] = useState("");
  const [res, setRes] = useState(null);

  const run = () => {
    const r = suggestClause(text);
    if (!r.ok) {
      toast.warning("Cannot suggest", r.error);
      return;
    }
    setRes(r);
    logAuditEvent({
      action: "AI clause suggestion",
      target: r.label,
    });
  };

  const copy = async (t) => {
    try {
      await navigator.clipboard.writeText(t);
      toast.success("Copied", "Suggested clause copied to clipboard.");
    } catch {}
  };

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-6">
      <GlassCard className="!p-5 space-y-4">
        <div className="flex items-center gap-2 text-white">
          <Wand2 className="w-4 h-4 text-cyanglow" />
          <h3 className="font-semibold">Clause Suggestions & Redlines</h3>
        </div>
        <p className="text-xs text-slate-400">
          Paste a clause to receive an improved version with redline-style
          rationale. The engine recognizes confidentiality, term/survival,
          governing law, equitable relief, return/destruction, and IP clauses.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder='Paste a single clause (e.g. "The Receiving Party shall hold all Confidential Information…")'
          className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-slate-200 font-mono outline-none focus:border-cyan-400/40"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setText("");
              setRes(null);
            }}
            className="btn-ghost text-xs text-rose-300"
          >
            Clear
          </button>
          <button
            onClick={run}
            className="inline-flex items-center gap-2 bg-grad-primary text-white px-4 py-2 rounded-xl text-sm shadow-glow"
          >
            <Sparkles className="w-4 h-4" />
            Suggest Improvement
          </button>
        </div>

        {res && (
          <div className="space-y-4 pt-2">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              Detected clause type
            </div>
            <div className="text-sm font-semibold text-white">{res.label}</div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-rose-500/5 border border-rose-400/30 rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-wider text-rose-300 mb-1">
                  Original (your clause)
                </div>
                <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {res.original}
                </div>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-400/30 rounded-xl p-3 relative">
                <div className="text-[10px] uppercase tracking-wider text-emerald-300 mb-1">
                  Suggested (AI redline)
                </div>
                <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {res.suggested}
                </div>
                <button
                  onClick={() => copy(res.suggested)}
                  className="absolute top-2 right-2 btn-ghost !p-1.5"
                  title="Copy suggested clause"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>

            {res.redline && (
              <div className="grid sm:grid-cols-2 gap-3 text-[11px]">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="text-slate-400 mb-1">Added (key terms)</div>
                  <div className="flex flex-wrap gap-1">
                    {res.redline.added.length === 0 ? (
                      <span className="text-slate-500">—</span>
                    ) : (
                      res.redline.added.map((w) => (
                        <span
                          key={w}
                          className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-200 border border-emerald-400/30"
                        >
                          +{w}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="text-slate-400 mb-1">Removed / replaced</div>
                  <div className="flex flex-wrap gap-1">
                    {res.redline.removed.length === 0 ? (
                      <span className="text-slate-500">—</span>
                    ) : (
                      res.redline.removed.map((w) => (
                        <span
                          key={w}
                          className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-200 border border-rose-400/30 line-through"
                        >
                          {w}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-cyan-500/5 border border-cyan-400/30 rounded-xl p-3">
              <div className="text-[10px] uppercase tracking-wider text-cyan-300 mb-1">
                Why this is better
              </div>
              <ul className="text-xs text-slate-200 space-y-1 list-disc pl-5">
                {res.rationale.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </GlassCard>

      <GlassCard className="!p-4 h-fit space-y-2">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
          Clause library
        </div>
        {CLAUSE_LIBRARY.map((c) => (
          <button
            key={c.key}
            onClick={() => setText(c.text)}
            className="w-full text-left text-xs text-slate-200 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
          >
            {c.name}
          </button>
        ))}
      </GlassCard>
    </div>
  );
}

/* ----------------------------- Sample NDA text --------------------------- */
const SAMPLE_NDA = `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement (this "Agreement") is entered into and effective as of January 15, 2026 by and between Contoso Corporation, located at 1 Microsoft Way, Redmond, WA 98052, USA ("Company"), and Acme Robotics Inc., located at 500 Innovation Drive, Boston, MA 02110, USA ("Counterparty"). Contact: legal@acmerobotics.com.

1. PURPOSE
The Parties wish to explore a potential business relationship in connection with joint research into autonomous warehouse systems (the "Purpose").

2. CONFIDENTIAL INFORMATION
"Confidential Information" means any non-public business, technical, financial, or other information disclosed by one party to the other, whether orally, in writing, or electronically.

3. OBLIGATIONS
The Receiving Party shall hold the Confidential Information in strict confidence and use it solely for the Purpose.

4. TERM
This Agreement shall remain in effect for two (2) years from the Effective Date. Confidentiality obligations shall survive for three (3) years.

5. GOVERNING LAW
This Agreement shall be governed by the laws of Delaware, USA, with exclusive jurisdiction in Wilmington, Delaware.

IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.

Contoso Corporation                Acme Robotics Inc.
By: __________________________    By: __________________________
Name:                              Name:
Title:                             Title:
`;
