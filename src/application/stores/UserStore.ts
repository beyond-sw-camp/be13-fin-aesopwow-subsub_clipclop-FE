// /src/application/stores/UserStore.ts
import { create } from "zustand";
import { CustomError } from "@/error/CustomError";
import { ErrorCode } from "@/error/ErrorCode";

interface UserState {
  companyNo: number | null;
  setCompanyNo: (companyNo: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  companyNo: null, // 로그인 후 할당됨
  setCompanyNo: (companyNo: number) => set({ companyNo }),
}));

// 유틸 함수: 반드시 companyNo가 존재해야 한다는 전제
export function getUser() {
  const { companyNo } = useUserStore.getState();
  if (!companyNo) {
    throw new CustomError(ErrorCode.USER_NOT_FOUND);
  }
  return { companyNo };
}