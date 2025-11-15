import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Welcome
        </h1>
        {!user ? (
          <>
            <p className="text-slate-300 mb-4">
              You are currently <span className="font-semibold">logged out</span>.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-emerald-400 transition-colors"
            >
              Go to login
            </Link>
          </>
        ) : (
          <>
            <p className="text-slate-300 mb-4">
              Logged in as{" "}
              <span className="font-semibold text-emerald-300">
                {user.email}
              </span>
            </p>
            <div className="flex gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-emerald-400 transition-colors"
              >
                Go to dashboard
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900 transition-colors"
              >
                Switch account
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
