// src/app/posts/new/NewPostForm.tsx

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface NewPostFormProps {
  userId: string;
}

export default function NewPostForm({ userId }: NewPostFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (!title.trim() || !content.trim()) {
        setErrorMsg("Title and content are required.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("posts").insert({
        title: title.trim(),
        content: content.trim(),
        author_id: userId,
      });

      if (error) {
        throw error;
      }

      // Success – go back to home or dashboard
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message ?? "Failed to create post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-200">
          Title
        </label>
        <input
          type="text"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Club meeting, event, or announcement title"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-200">
          Content
        </label>
        <textarea
          className="w-full min-h-[150px] rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write the details of your post here..."
          required
        />
      </div>

      {errorMsg && (
        <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Publishing..." : "Publish post"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
