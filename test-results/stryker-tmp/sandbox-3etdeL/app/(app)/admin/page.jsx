// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import Topbar from "@/components/Topbar";
import { GlassCard } from "@/components/ui";
import { adminUsers } from "@/lib/mockData";
import { listUsers, addUser, removeUser } from "@/lib/userStore";
import {
  Building2,
  Sparkles,
  Shield,
  Users,
  Bell,
  Plug,
  Save,
  Palette,
  Moon,
  Sun,
} from "lucide-react";
import {
  getStoredTheme,
  setStoredTheme,
} from "@/components/ThemeManager";

const tabs = [
  { id: "org", label: "Organization", icon: Building2 },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "ai", label: "AI Settings", icon: Sparkles },
  { id: "security", label: "Security & Compliance", icon: Shield },
  { id: "users", label: "Users & Roles", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Plug },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition ${
        checked ? "bg-grad-primary" : "bg-white/10 border border-white/10"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

function Setting({ title, desc, children }) {
  return (
    <div className="flex items-start justify-between gap-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
      <div>
        <div className="font-medium text-white text-sm">{title}</div>
        <div className="text-xs text-slate-400 mt-1">{desc}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState("org");
  const [aiAssist, setAiAssist] = useState(true);
  const [autoApprove, setAutoApprove] = useState(true);
  const [redact, setRedact] = useState(true);
  const [mfa, setMfa] = useState(true);
  const [audit, setAudit] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [slackNotif, setSlackNotif] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    role: "Business User",
    email: "",
  });
  const [userError, setUserError] = useState("");

  useEffect(() => {
    setUsers(listUsers());
    const refresh = () => setUsers(listUsers());
    window.addEventListener("clm:users-changed", refresh);
    return () => window.removeEventListener("clm:users-changed", refresh);
  }, []);

  const onAddUser = (e) => {
    e?.preventDefault?.();
    setUserError("");
    if (!newUser.firstName.trim() || !newUser.lastName.trim()) {
      setUserError("First name and last name are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(newUser.email)) {
      setUserError("Please enter a valid email address.");
      return;
    }
    addUser(newUser);
    setNewUser({
      title: "Mr.",
      firstName: "",
      lastName: "",
      role: "Business User",
      email: "",
    });
  };

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  const pickTheme = (next) => {
    setTheme(next);
    setStoredTheme(next);
  };

  return (
    <>
      <Topbar
        title="Admin Settings"
        subtitle="Configure your organization, AI behavior, security and integrations."
        actions={<button className="btn-primary"><Save className="w-4 h-4" /> Save Changes</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <GlassCard className="lg:col-span-1 !p-3">
          <ul className="space-y-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => setTab(t.id)}
                    className={`w-full nav-link ${active ? "nav-link-active" : ""}`}
                  >
                    <Icon className="w-4 h-4" />
                    {t.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </GlassCard>

        <GlassCard className="lg:col-span-3 space-y-4">
          {tab === "org" && (
            <>
              <h3 className="font-semibold text-white text-lg">Organization</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Legal entity name</label>
                  <input className="input" defaultValue="Contoso Corporation" />
                </div>
                <div>
                  <label className="label">Default jurisdiction</label>
                  <select className="input"><option>Delaware, USA</option><option>England & Wales</option></select>
                </div>
                <div>
                  <label className="label">Default NDA term</label>
                  <select className="input"><option>2 years</option><option>3 years</option><option>5 years</option></select>
                </div>
                <div>
                  <label className="label">Time zone</label>
                  <select className="input"><option>America/Los_Angeles</option><option>America/New_York</option><option>Europe/London</option></select>
                </div>
              </div>
            </>
          )}

          {tab === "appearance" && (
            <>
              <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                <Palette className="w-4 h-4 text-cyanglow" /> Appearance
              </h3>
              <p className="text-xs text-slate-400">
                Choose how CLM looks. Your selection is saved on this device.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  data-testid="theme-dark"
                  onClick={() => pickTheme("dark")}
                  className={
                    "text-left rounded-2xl border p-4 transition " +
                    (theme === "dark"
                      ? "border-cyan-400/60 bg-cyan-500/10 shadow-glow"
                      : "border-white/10 bg-white/5 hover:border-white/20")
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Moon className="w-4 h-4 text-indigo-300" /> Dark Theme
                    </div>
                    {theme === "dark" && (
                      <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="mt-3 h-20 rounded-lg bg-gradient-to-br from-[#070b1a] to-[#1e293b] border border-white/10 grid grid-cols-3 gap-1 p-1.5">
                    <div className="rounded bg-white/10" />
                    <div className="rounded bg-white/5" />
                    <div className="rounded bg-grad-primary" />
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Default deep-navy look with glass surfaces.
                  </div>
                </button>

                <button
                  type="button"
                  data-testid="theme-white"
                  onClick={() => pickTheme("light")}
                  className={
                    "text-left rounded-2xl border p-4 transition " +
                    (theme === "light"
                      ? "border-cyan-400/60 bg-cyan-500/10 shadow-glow"
                      : "border-white/10 bg-white/5 hover:border-white/20")
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Sun className="w-4 h-4 text-amber-300" /> White Theme
                    </div>
                    {theme === "light" && (
                      <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="mt-3 h-20 rounded-lg bg-gradient-to-br from-[#f4f6fb] to-[#e2e8f0] border border-slate-300 grid grid-cols-3 gap-1 p-1.5">
                    <div className="rounded bg-white" />
                    <div className="rounded bg-slate-200" />
                    <div className="rounded bg-grad-primary" />
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    Bright, high-contrast surfaces for daytime work.
                  </div>
                </button>
              </div>
            </>
          )}

          {tab === "ai" && (
            <>
              <h3 className="font-semibold text-white text-lg flex items-center gap-2"><Sparkles className="w-4 h-4 text-cyanglow" /> AI Settings</h3>
              <Setting title="Enable NDAFlow AI assistant" desc="Drafting, clause suggestions and risk scoring.">
                <Toggle checked={aiAssist} onChange={setAiAssist} />
              </Setting>
              <Setting title="Auto-approve low-risk NDAs" desc="Skip counsel review when risk score < 28 and template matches.">
                <Toggle checked={autoApprove} onChange={setAutoApprove} />
              </Setting>
              <Setting title="Redact PII before sending to AI" desc="Strip names and identifiers from prompts (recommended).">
                <Toggle checked={redact} onChange={setRedact} />
              </Setting>
              <Setting title="AI model" desc="Choose which model NDAFlow uses for drafting.">
                <select className="input !w-56"><option>NDAFlow-Pro v2</option><option>Azure OpenAI GPT-4o</option><option>On-prem (Foundry)</option></select>
              </Setting>
            </>
          )}

          {tab === "security" && (
            <>
              <h3 className="font-semibold text-white text-lg">Security & Compliance</h3>
              <Setting title="Require MFA" desc="All users must use a second factor.">
                <Toggle checked={mfa} onChange={setMfa} />
              </Setting>
              <Setting title="Audit log retention" desc="How long to keep immutable audit events.">
                <select className="input !w-40"><option>1 year</option><option>3 years</option><option>7 years</option></select>
              </Setting>
              <Setting title="Immutable audit trail" desc="Write-once chain of custody for every record action.">
                <Toggle checked={audit} onChange={setAudit} />
              </Setting>
              <Setting title="SSO Provider" desc="Identity provider for single sign-on.">
                <select className="input !w-56"><option>Microsoft Entra ID</option><option>Okta</option><option>Google Workspace</option></select>
              </Setting>
            </>
          )}

          {tab === "users" && (
            <>
              <h3 className="font-semibold text-white text-lg">Users & Roles</h3>

              {/* Add User form */}
              <form
                onSubmit={onAddUser}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-3"
              >
                <div className="text-sm font-medium text-white">Add a new user</div>
                <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                  <div className="sm:col-span-1">
                    <label className="label">Title</label>
                    <select
                      data-testid="user-title"
                      className="input"
                      value={newUser.title}
                      onChange={(e) => setNewUser({ ...newUser, title: e.target.value })}
                    >
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                      <option>Miss</option>
                      <option>Dr.</option>
                      <option>Prof.</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">First name</label>
                    <input
                      data-testid="user-first-name"
                      className="input"
                      placeholder="e.g. Sarah"
                      value={newUser.firstName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Last name</label>
                    <input
                      data-testid="user-last-name"
                      className="input"
                      placeholder="e.g. Johnson"
                      value={newUser.lastName}
                      onChange={(e) =>
                        setNewUser({ ...newUser, lastName: e.target.value })
                      }
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="label">Role</label>
                    <select
                      data-testid="user-role"
                      className="input"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option>Business User</option>
                      <option>Legal Reviewer</option>
                      <option>Senior Counsel</option>
                      <option>Paralegal</option>
                      <option>Privacy Officer</option>
                      <option>Chief Legal Officer</option>
                      <option>Admin</option>
                      <option>Executive Viewer</option>
                    </select>
                  </div>
                  <div className="sm:col-span-6">
                    <label className="label">Email</label>
                    <input
                      type="email"
                      data-testid="user-email"
                      className="input"
                      placeholder="sarah.johnson@contoso.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                </div>
                {userError && (
                  <div className="text-xs text-rose-300">{userError}</div>
                )}
                <div className="flex justify-end">
                  <button data-testid="add-user-submit" type="submit" className="btn-primary">
                    + Add User
                  </button>
                </div>
              </form>

              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                    <th className="px-2 py-2 font-medium">Title</th>
                    <th className="px-2 py-2 font-medium">First Name</th>
                    <th className="px-2 py-2 font-medium">Last Name</th>
                    <th className="px-2 py-2 font-medium">Role</th>
                    <th className="px-2 py-2 font-medium">Email</th>
                    <th className="px-2 py-2"></th>
                  </tr></thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id || u.email} className="table-row">
                        <td className="px-2 py-3 text-slate-300">{u.title || "—"}</td>
                        <td className="px-2 py-3 font-medium text-white flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-grad-primary grid place-items-center text-[11px] font-bold">
                            {(u.firstName?.[0] || "") + (u.lastName?.[0] || "")}
                          </span>
                          {u.firstName}
                        </td>
                        <td className="px-2 py-3 text-slate-300">{u.lastName}</td>
                        <td className="px-2 py-3 text-slate-300">{u.role}</td>
                        <td className="px-2 py-3 text-slate-400">{u.email}</td>
                        <td className="px-2 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => removeUser(u.id)}
                            className="btn-ghost !py-1 !px-2 text-xs"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === "notifications" && (
            <>
              <h3 className="font-semibold text-white text-lg">Notifications</h3>
              <Setting title="Email notifications" desc="Send updates and approvals via email.">
                <Toggle checked={emailNotif} onChange={setEmailNotif} />
              </Setting>
              <Setting title="Slack notifications" desc="Post to a Slack channel when actions are needed.">
                <Toggle checked={slackNotif} onChange={setSlackNotif} />
              </Setting>
              <Setting title="SLA alerts" desc="Notify owners when an NDA approaches its SLA.">
                <Toggle checked={true} onChange={() => {}} />
              </Setting>
            </>
          )}

          {tab === "integrations" && (
            <>
              <h3 className="font-semibold text-white text-lg">Integrations</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "DocuSign", desc: "E-signature", connected: true },
                  { name: "Microsoft 365", desc: "Word + Outlook", connected: true },
                  { name: "Salesforce", desc: "CRM sync", connected: false },
                  { name: "Slack", desc: "Channel notifications", connected: false },
                  { name: "Azure Cosmos DB", desc: "Record storage", connected: true },
                  { name: "Microsoft Foundry", desc: "AI model hosting", connected: true },
                ].map((i) => (
                  <div key={i.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white text-sm">{i.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{i.desc}</div>
                    </div>
                    <button
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${
                        i.connected
                          ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
                          : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {i.connected ? "Connected" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </GlassCard>
      </div>
    </>
  );
}
