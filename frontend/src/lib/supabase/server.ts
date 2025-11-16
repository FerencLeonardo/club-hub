import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // In Server Components we CANNOT modify cookies,
        // so these are no-ops to avoid the runtime error.
        set() {
          // no-op
        },
        remove() {
          // no-op
        },
      },
    }
  );
}
