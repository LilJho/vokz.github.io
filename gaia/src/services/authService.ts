import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface AuthValues {
  email: string;
  password: string;
}

const authService = async ({ email, password }: AuthValues) => {
  const supabase = createClientComponentClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return "login successful";
};

export { authService };
