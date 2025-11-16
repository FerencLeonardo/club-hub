"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === "/login" || pathname?.startsWith("/login");

  // Login page: no header/footer, just center content
  if (hideNav) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
        {children}
      </div>
    );
  }

  // All other pages: full-width header/footer, constrained main
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* HEADER spans full width */}
      <header className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            ClubHub
          </Link>

          <nav className="flex gap-4 text-sm">
            <Link
              href="/"
              className="text-slate-300 hover:text-emerald-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-emerald-300 transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN content constrained to your container */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">
        {children}
      </main>

      {/* FOOTER spans full width */}
      <footer className="w-full border-t border-slate-800 bg-slate-900/80">
        <div className="text-center mx-auto max-w-4xl px-4 py-3 text-xs text-slate-500">
          © {new Date().getFullYear()} ClubHub
        </div>
      </footer>
    </div>
  );
}
