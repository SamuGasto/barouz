"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const signUpAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ id_user: string; success: boolean }> => {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/register", error.message);
  }

  if (data.user) return { id_user: data.user.id, success: true };

  return { id_user: "", success: false };
};

export async function signInAction({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ success: boolean }> {
  // Log 3: Inicio de Server Action de login
  console.log("SERVER ACTION: Iniciando signInAction para email:", email);
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Log 4: Error detallado de Supabase en Server Action
    console.error(
      "SERVER ACTION ERROR: Error de Supabase al iniciar sesión:",
      error.message,
      error.status
    );
    // Lanza un error genérico para el cliente para evitar exponer detalles sensibles
    throw new Error(
      "Credenciales inválidas o error de servidor. Por favor, verifica e intenta de nuevo."
    );
  }

  // Log 5: Login exitoso en Server Action
  console.log(
    "SERVER ACTION: Inicio de sesión exitoso. Revalidando y redirigiendo."
  );
  return { success: true };
}

export async function signOutAction(): Promise<{ success: boolean }> {
  // Log 6: Inicio de Server Action de logout
  console.log("SERVER ACTION: Iniciando signOutAction.");
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    // Log 7: Error detallado de Supabase al cerrar sesión
    console.error(
      "SERVER ACTION ERROR: Error de Supabase al cerrar sesión:",
      error.message,
      error.status
    );
    throw new Error("No se pudo cerrar sesión.");
  }

  // Log 8: Cierre de sesión exitoso en Server Action
  console.log(
    "SERVER ACTION: Cierre de sesión exitoso. Revalidando y redirigiendo."
  );
  return { success: true };
}

export const signInWithOtp = async ({ email }: { email: string }) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { data: { email } };
};

export const verifyOtp = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return { error: error.message };
  }

  return { data: { success: true } };
};

export const updatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { data };
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};
