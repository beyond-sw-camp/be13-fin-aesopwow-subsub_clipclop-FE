import { create } from "zustand";

interface UserState {
  userNo: number;
  username: string;
  companyNo: number;
}

interface UserStore {
  user: UserState;
  setUser: (user: UserState) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    userNo: 1,
    username: "test",
    companyNo: 1,
  },
  setUser: (user) => set({ user }),
}));

// 선택적으로 외부에서 쉽게 user만 가져올 수 있게 헬퍼 제공
export const getUser = () => useUserStore.getState().user;
