import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserWithType() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userType = user?.user_metadata?.user_type as
    | "student"
    | "org"
    | undefined;

  return { user, userType };
}
