import { create } from "zustand";

interface UserState {
  companyNo: number;
  setCompanyNo: (companyNo: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  companyNo: 1, // 기본값. 로그인 후 초기화되면 바꿀 수 있음
  setCompanyNo: (companyNo: number) => set({ companyNo }),
}));

// 유틸 함수처럼 단독 호출해서 값을 가져오고 싶을 때
export function getUser() {
  const { companyNo } = useUserStore.getState();
  return { companyNo };
}
