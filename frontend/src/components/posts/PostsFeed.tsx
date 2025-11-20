"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export default function PostsFeed() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadInitialPosts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setPosts(data);
      }
      setLoading(false);
    }

    loadInitialPosts();

    // Realtime subscription
    const channel = supabase
      .channel("realtime-posts")
      .on(
        "postgres_changes",
        {
          event: "*", // "INSERT" | "UPDATE" | "DELETE" | "*" 
          schema: "public",
          table: "posts",
        },
        (payload) => {
          setPosts((current) => {
            const curr = current ?? [];

            if (payload.eventType === "INSERT") {
              const newPost = payload.new as Post;
              // add new post to the top
              return [newPost, ...curr];
            }

            if (payload.eventType === "UPDATE") {
              const updated = payload.new as Post;
              return curr.map((p) => (p.id === updated.id ? updated : p));
            }

            if (payload.eventType === "DELETE") {
              const oldRow = payload.old as { id: string };
              return curr.filter((p) => p.id !== oldRow.id);
            }

            return curr;
          });
        }
      )
      .subscribe();

    // cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading && !posts) {
    return <p className="text-sm text-slate-400">Loading posts...</p>;
  }

  if (errorMsg) {
    return (
      <p className="text-sm text-red-400">
        Failed to load posts: {errorMsg}
      </p>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <p className="text-slate-400 text-sm">
        No posts yet. When organizations start posting, they’ll show up here.
      </p>
    );
  }

  return (
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
  );
}
