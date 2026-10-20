"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string | null;
  success?: boolean;
};

export async function signUp(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;
  const accountType = formData.get("accountType") as string;

  if (!email || !password || !firstName || !lastName || !accountType) {
    return { error: "Please fill in all required fields." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  const supabase = await createClient();

  const fullName = `${firstName.trim()} ${lastName.trim()}`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone || null,
        role: accountType, // 'student' | 'parent' | 'teacher'
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmation is disabled in Supabase, the user is logged in immediately.
  // Otherwise, user needs to check their email.
  if (data?.session) {
    if (accountType === "parent") redirect("/parent-dashboard/overview");
    if (accountType === "teacher") redirect("/staff-dashboard/overview");
    redirect("/dashboard/overview");
  }

  return { success: true };
}

export async function signIn(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Fetch the user's role from their profile to redirect to the proper portal
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  const role = profile?.role;

  if (role === "parent") {
    redirect("/parent-dashboard/overview");
  } else if (role === "teacher" || role === "principal" || role === "vice_principal" || role === "bursar") {
    redirect("/staff-dashboard/overview");
  } else if (role === "admin" || role === "super_admin") {
    redirect("/admin/overview");
  } else {
    redirect("/dashboard/overview");
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
