import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClubHub",
  description: "Next.js + Supabase + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen flex flex-col">
          {/* MAIN CONTENT */}
          <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

