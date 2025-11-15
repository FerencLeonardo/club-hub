import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Home</h1>

      {!user ? (
        <>
          <p>You are not logged in.</p>
          <Link href="/login">Go to login</Link>
        </>
      ) : (
        <>
          <p>Logged in as: {user.email}</p>
          <Link href="/dashboard">Go to dashboard</Link>
        </>
      )}
    </main>
  );
}
