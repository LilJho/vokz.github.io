import { create } from "zustand";

type ToggleStoreState = {
  isMinimized: boolean;
  minimize: () => void;
};

const useMinimized = create<ToggleStoreState>((set) => ({
  isMinimized: false,
  minimize: () => set((state) => ({ isMinimized: !state.isMinimized })),
}));

export default useMinimized;
