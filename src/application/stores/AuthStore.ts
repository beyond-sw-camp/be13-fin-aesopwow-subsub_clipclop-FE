import { create } from "zustand";

interface AuthState {
  token: string | null;
  companyNo: number | null;
  isInitialized: boolean;
  isLoggedIn: boolean;
  setToken: (token: string, remember: boolean) => void;
  setCompanyNo: (companyNo: number) => void;
  logout: () => void;
  initializeToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  companyNo: null,
  isInitialized: false,
  isLoggedIn: false,
  setToken: (token: string, remember: boolean) => {
    set({ token, isLoggedIn: true });
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", token);
  },
  setCompanyNo: (companyNo: number) => set({ companyNo }),
  logout: () => {
    set({ token: null, companyNo: null, isLoggedIn: false });
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  },
  initializeToken: () => {
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    const token = localToken || sessionToken;
    set({ token, isInitialized: true, isLoggedIn: !!token });
  },
}));