import supabase from "./supabaseClient";

export const signUpWithEmail = async (email, password) => {
  const { user, session, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return { user, session };
};

export const signInWithEmail = async (email, password) => {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) throw error;
  return { user, session };
};
