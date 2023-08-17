"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const supabase = createClientComponentClient();

  const { push, refresh } = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    refresh();
    push("/auth/sign-in");
  };

  return handleSignOut;
};

export default useLogout;
