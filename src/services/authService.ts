import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserAccountsService } from "./databaseServices";
import { IUserSessionData } from "@/lib/types";

interface AuthValues {
  email: string;
  password: string;
}

type AuthServiceResponse = { user: IUserSessionData } | { error: string };

const authService = async ({
  email,
  password,
}: AuthValues): Promise<AuthServiceResponse> => {
  const supabase = createClientComponentClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const userData = authData.user;
  const data: any = await UserAccountsService.getOne("uuid", userData.id);

  const user = {
    email: userData.email!,
    first_name: data.first_name,
    last_name: data?.last_name,
    middle_name: data?.middle_name,
    role: data?.role,
  };

  return { user };
};

export { authService };
