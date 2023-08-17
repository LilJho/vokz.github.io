import { create } from "zustand";

type ToggleStoreState = {
  isToggled: boolean;
  toggle: () => void;
};

const useToggleSidebar = create<ToggleStoreState>((set) => ({
  isToggled: false,
  toggle: () => set((state) => ({ isToggled: !state.isToggled })),
}));

export default useToggleSidebar;
