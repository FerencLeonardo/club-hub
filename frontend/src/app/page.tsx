import Link from "next/link";
import { getCurrentUserWithProfile, getUserDisplayName } from "@/lib/auth/currentUser";

export default async function HomePage() {
  const { user, profile } = await getCurrentUserWithProfile();
  const displayName = await getUserDisplayName();

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
                {displayName || user.email}
              </span>
            </p>
          </>
        )}
      </section>
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
      <h2 className="text-xl font-semibold tracking-tight mb-4 text-slate-100">
        Posts
      </h2>
      <div className="space-y-4">
        <p className="text-slate-300 mb-4">
        This is a placeholder for posts content.
      </p>
      </div>

      </section>
    </div>
  );
}
