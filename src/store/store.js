import { create } from "zustand";
const useStore = create((set) => ({
  isAuth: true,
  username: "",
  setIsAuth: () => set({ isAuth: true }),
  setUsername: (username) => set({ username }),
  logout: () => set({ isAuth: false, username: "" }),
}));

export default useStore;
