import { UserDataType } from "@/lib/types";
import { createServerSupabaseClient } from "@/services/supabaseServer";

const getUserSessionData = async () => {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let { data }: any = await supabase
    .from("user_accounts")
    .select("*")
    .eq("uuid", session?.user.id);

  const userData: UserDataType = {
    email: session?.user.email!,
    role: data[0]?.role,
    first_name: data[0]?.first_name,
    last_name: data[0]?.last_name,
    middle_name: data[0]?.middle_name,
    id: data[0]?.id,
    uuid: data[0]?.uuid,
  };

  return { session, userData };
};

export { getUserSessionData };
