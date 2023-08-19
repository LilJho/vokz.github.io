import { create } from "zustand";
import { UserDataType } from "../types";

type UserStoreState = {
  user: UserDataType | null;
  setUser: (user: UserDataType) => void;
};

const userStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user: UserDataType) => set(() => ({ user })),
}));

export default userStore;
