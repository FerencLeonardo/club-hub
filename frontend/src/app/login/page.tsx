"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const supabase = createClient();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/40">
        <h1 className="text-2xl font-semibold tracking-tight mb-1">
          {mode === "signin" ? "Sign in" : "Create an account"}
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          {mode === "signin"
            ? "Welcome back. Sign in with your email and password."
            : "Sign up to start using the app."}
        </p>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              mode === "signin"
                ? "border-emerald-500 bg-emerald-500 text-slate-900"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              mode === "signup"
                ? "border-emerald-500 bg-emerald-500 text-slate-900"
                : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500"
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading
              ? "Working..."
              : mode === "signin"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500">
          <Link
            href="/"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
          >
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
