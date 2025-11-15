import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Dashboard
        </h1>
        <p className="text-slate-300 mb-4">
          Welcome,{" "}
          <span className="font-semibold text-emerald-300">
            {user.email}
          </span>
        </p>
        <p className="text-sm text-slate-400 mb-4">
          This is a protected page. Only logged-in users can see it.
        </p>
        <LogoutButton />
      </section>
    </div>
  );
}
