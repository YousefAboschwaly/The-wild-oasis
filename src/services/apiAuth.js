import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  // To check if there is user that make login before or not
  if (!session.session) return null;
  // To get data about user if there is user exist
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new error(error.message);
  return data;
}
