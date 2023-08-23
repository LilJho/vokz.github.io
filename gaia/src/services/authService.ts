import {
  createClientComponentClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";

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

const registerService = async ({ email, password }: AuthValues) => {
  const supabase = createClientComponentClient();
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  // Return the UUID of the registered user
  return data.user?.id;
};

const createResetPasswordToken = async (email: any) => {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/update-password",
  });

  if (error) {
    throw new Error(error.message);
  }
};

const updatePassword = async (password: any) => {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    throw new Error(error.message);
  }
};

export {
  authService,
  registerService,
  createResetPasswordToken,
  updatePassword,
};
