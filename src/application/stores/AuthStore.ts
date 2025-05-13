import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (token: string, remember: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string, remember: boolean) => {
        // token을 상태에 저장
        set({ token });

        // remember me 체크 여부에 따라 저장 위치 결정
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("token", token);
      },
      logout: () => {
        set({ token: null });
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage", // persist용 이름 (실제 저장은 직접 처리하므로 여기선 의미 적음)
      storage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      },
    }
  )
);
