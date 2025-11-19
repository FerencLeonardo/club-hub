"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === "/login" || pathname?.startsWith("/login");

  const [isOrg, setIsOrg] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsOrg(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("user_type")
        .eq("id", user.id)
        .single();

      setIsOrg(profile?.user_type === "org");
    }

    loadProfile();
  }, []);

  // Login page: no nav/footer
  if (hideNav) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* HEADER */}
      <header className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            ClubHub
          </Link>

          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/"
              className="px-2 py-1 rounded-md text-slate-300 hover:text-emerald-300 hover:bg-slate-800/70 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              className="px-2 py-1 rounded-md text-slate-300 hover:text-emerald-300 hover:bg-slate-800/70 transition-colors"
            >
              Dashboard
            </Link>

            {/* ORG-ONLY button */}
            {isOrg && (
              <Link
                href="/posts/new"
                className="ml-2 inline-flex items-center rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-emerald-400 transition-colors"
              >
                + New post
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800 bg-slate-900/80">
        <div className="mx-auto max-w-4xl px-4 py-3 text-xs text-slate-500 text-center">
          © {new Date().getFullYear()} ClubHub
        </div>
      </footer>
    </div>
  );
}
