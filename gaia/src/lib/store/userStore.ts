import { authService } from "@/services/authService";
import { create } from "zustand";
import { IUserSessionData } from "../types";
import { persist } from "zustand/middleware";

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

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user: any | null) => set({ user }),
      signIn: async ({ email, password }: AuthValues) => {
        const result: any = await authService({ email, password });
        if (!result.error) {
          set({ user: result.user });
        } else {
          throw new Error(result.error);
        }
      },
      signOut: async () => {
        localStorage.removeItem("user-session");
        set({ user: null });
      },
    }),
    {
      name: "user-session", // unique name for session storage entry
      getStorage: () => localStorage, // use session storage
    }
  )
);
