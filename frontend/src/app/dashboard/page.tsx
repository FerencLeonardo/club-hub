import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";
import { getCurrentUserWithType } from "@/lib/auth/currentUser";

export default async function DashboardPage() {
  const { user, userType } = await getCurrentUserWithType();

  if (!user) {
    redirect("/login");
  }

  if (userType === "org") {
    // ORG DASHBOARD
    return (
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            Organization Dashboard
          </h1>
          <p className="text-slate-300 mb-4">
            Manage your club, events, and members.
          </p>
          {/* Org-specific actions go here */}
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

  // Default = student (or unknown)
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/40">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Student Dashboard
        </h1>
        <p className="text-slate-300 mb-4">
          Browse clubs, join organizations, and see your memberships.
        </p>
        {/* Student-specific actions go here */}
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
