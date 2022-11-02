import create from "zustand";
import { persist } from "zustand/middleware";

const authStore = (set) => ({
  userPro: null,

  addUser: (user) => set({ userPro: user }),
  removeUser: () => set({ userPro : null}),
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
