import { create } from "zustand";

interface AuthState {
  token: string | null;
  isInitialized: boolean;
  setToken: (token: string, remember: boolean) => void;
  logout: () => void;
  initializeToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isInitialized: false,
  setToken: (token: string, remember: boolean) => {
    set({ token });
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", token);
  },
  logout: () => {
    set({ token: null });
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  },
  initializeToken: () => {
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    const token = localToken || sessionToken;
    set({ token, isInitialized: true });
  },
}));