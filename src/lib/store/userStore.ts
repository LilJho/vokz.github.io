import { authService } from "@/services/authService";
import { create } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IUserSessionData } from "../types";
import { persist } from "zustand/middleware";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

interface AuthValues {
  email: string;
  password: string;
}

interface UserStore {
  user: IUserSessionData | null;
  setUser: (user: IUserSessionData | null) => void;
  signIn: (AuthValues: AuthValues) => Promise<void>;
  signOut: () => void;
}

const supabase = createClientComponentClient();

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user: IUserSessionData | null) => set({ user }),
      signIn: async ({ email, password }: AuthValues) => {
        const result: any = await authService({ email, password });
        if (!result.error) {
          set({ user: result.user });
        } else {
          throw new Error(result.error);
        }
      },
      signOut: async () => {
        set({ user: null });
        await supabase.auth.signOut();
      },
    }),
    {
      name: "user-session", // unique name for session storage entry
      getStorage: () => sessionStorage, // use session storage
    }
  )
);
