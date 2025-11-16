import { createClient } from "@/lib/supabase/server";

export async function getCurrentUserWithProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("user_type, first_name, last_name, org_name")
    .eq("id", user.id)
    .single();

  return { user, profile };
}

export async function getUserDisplayName() {
  const { user, profile } = await getCurrentUserWithProfile();
  
  if (!user) return null;
  
  if (profile?.user_type === "student") {
    const firstName = profile.first_name || "";
    const lastName = profile.last_name || "";
    return `${firstName} ${lastName}`.trim();
  } else if (profile?.user_type === "org") {
    return profile?.org_name || "";
  }
  
  return null;
}