// src/app/posts/new/page.tsx

import { redirect } from "next/navigation";
import { getCurrentUserWithProfile } from "@/lib/auth/currentUser";
import NewPostForm from "./NewPostForm";

export default async function NewPostPage() {
  const { user, profile } = await getCurrentUserWithProfile();

  // Not logged in? -> go to login
  if (!user) {
    redirect("/login");
  }

  // Logged in but not an org? -> go home (or some "not allowed" page)
  if (profile?.user_type !== "org") {
    redirect("/");
  }

  // Org user -> show create post form
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Create a new post
        </h1>
        <p className="text-sm text-slate-400 mb-4">
          Share updates, announcements, or events with students.
        </p>

        <NewPostForm userId={user.id} />
      </section>
    </div>
  );
}
