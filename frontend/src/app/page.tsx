import Link from "next/link";
import {
  getCurrentUserWithProfile,
  getUserDisplayName,
} from "@/lib/auth/currentUser";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const { user } = await getCurrentUserWithProfile();
  const displayName = await getUserDisplayName();

  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      {/* WELCOME CARD */}
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

      {/* POSTS FEED */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
        <h2 className="text-xl font-semibold tracking-tight mb-4 text-slate-100">
          Posts
        </h2>

        {error && (
          <p className="text-sm text-red-400 mb-2">
            Failed to load posts: {error.message}
          </p>
        )}

        {!posts || posts.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No posts yet. When organizations start posting, they’ll show up here.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4"
              >
                <h3 className="text-lg font-semibold text-slate-100 mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-300 mb-3">
                  {post.content}
                </p>
                <p className="text-[11px] text-slate-500">
                  Posted on{" "}
                  {new Date(post.created_at).toLocaleString("en-US", {
                    timeZone: "America/New_York",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
