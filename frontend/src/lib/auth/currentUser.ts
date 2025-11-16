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

export async function getUserDisplayName() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const userType = user.user_metadata?.user_type;
  
  if (userType === "student") {
    const firstName = user.user_metadata?.first_name || "";
    const lastName = user.user_metadata?.last_name || "";
    return `${firstName} ${lastName}`.trim();
  } else if (userType === "org") {
    return user.user_metadata?.org_name || "";
  }
  
  return null;
}
