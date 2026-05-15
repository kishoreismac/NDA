"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Shield, Zap, Lock } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sara.patel@contoso.com");
  const [password, setPassword] = useState("demo");

  const onSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-grad-soft" />
        <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-grad-primary grid place-items-center shadow-glow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-2xl text-white tracking-tight">NDAFlow</div>
            <div className="text-[11px] uppercase tracking-[0.25em] gradient-text font-semibold">
              AI · Legal Operations Suite
            </div>
          </div>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Intelligent NDA <span className="gradient-text">intake, review</span> and signature — in minutes.
          </h2>
          <p className="text-slate-300 mt-5 leading-relaxed">
            NDAFlow AI scores risk, picks the right template, routes to the right
            reviewers, and drafts the document — all from a guided intake.
          </p>

          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { icon: Zap, label: "AI risk scoring" },
              { icon: Shield, label: "Auto-routing" },
              { icon: Lock, label: "Audit trail" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="glass p-3 text-center">
                <Icon className="w-5 h-5 mx-auto text-cyanglow" />
                <div className="text-[11px] mt-1.5 text-slate-300">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-slate-400">
          © 2026 Contoso Legal. SOC 2 · ISO 27001 · GDPR ready.
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-grad-primary grid place-items-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl">NDAFlow AI</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Sign in to your enterprise legal workspace.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="label">Work email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" defaultChecked className="accent-indigo-500" />
                Keep me signed in
              </label>
              <a className="text-cyanglow hover:underline" href="#">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn-primary w-full justify-center py-3 mt-2">
              Sign in to NDAFlow
            </button>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-white/10" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                <span className="bg-navy-950 px-2 text-slate-400">or</span>
              </div>
            </div>

            <button type="button" className="btn-ghost w-full justify-center py-3">
              <span className="w-4 h-4 rounded-sm bg-white grid place-items-center text-[10px] text-navy-900 font-bold">
                M
              </span>
              Continue with Microsoft Entra ID
            </button>
            <button type="button" className="btn-ghost w-full justify-center py-3">
              <Lock className="w-4 h-4" />
              Continue with SSO / SAML
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-8 text-center">
            By signing in you agree to the{" "}
            <Link href="#" className="text-slate-300 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-slate-300 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
