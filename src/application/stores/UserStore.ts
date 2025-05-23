// /src/application/stores/UserStore.ts
// import { create } from "zustand";
// import { CustomError } from "@/error/CustomError";
// import { ErrorCode } from "@/error/ErrorCode";

// interface UserState {
//   userNo: number | null;         // ✅ 추가
//   companyNo: number | null;
//   infoDbNo: number | null;
//   originTable: string | null;
//   setUserNo: (userNo: number) => void;  // ✅ 추가
//   setCompanyNo: (companyNo: number) => void;
//   setInfoDbNo: (infoDbNo: number) => void;
//   setOriginTable: (originTable: string) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   userNo: null,
//   companyNo: null,
//   infoDbNo: null,
//   originTable: null,
//   setUserNo: (userNo: number) => set({ userNo }),        // ✅ setter 추가
//   setCompanyNo: (companyNo: number) => set({ companyNo }),
//   setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
//   setOriginTable: (originTable: string) => set({ originTable }),
// }));

// // 유틸 함수: 모든 정보가 존재해야 한다는 전제
// export function getUser() {
//   const { userNo, companyNo, infoDbNo, originTable } = useUserStore.getState();
//   if (!userNo || !companyNo || !infoDbNo || !originTable) {
//     throw new CustomError(ErrorCode.USER_NOT_FOUND);
//   }
//   return { userNo, companyNo, infoDbNo, originTable };
// }

// /src/application/stores/UserStore.ts
import { create } from "zustand";
import { CustomError } from "@/error/CustomError";
import { ErrorCode } from "@/error/ErrorCode";

interface UserState {
  userNo: number | null;          // ✅ 추가
  companyNo: number | null;
  infoDbNo: number | null;
  originTable: string | null;
  setUserNo: (userNo: number) => void;  // ✅ 추가
  setCompanyNo: (companyNo: number) => void;
  setInfoDbNo: (infoDbNo: number) => void;
  setOriginTable: (originTable: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userNo: 1,                      // ✅ 테스트용 기본값 추가
  companyNo: 1,
  infoDbNo: 1,
  originTable: "subscription_user",
  setUserNo: (userNo: number) => set({ userNo }),     // ✅ setter 추가
  setCompanyNo: (companyNo: number) => set({ companyNo }),
  setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
  setOriginTable: (originTable: string) => set({ originTable }),
}));

// 유틸 함수: 모든 정보가 존재해야 한다는 전제
export function getUser() {
  const { userNo, companyNo, infoDbNo, originTable } = useUserStore.getState();
  if (!userNo || !companyNo || !infoDbNo || !originTable) {
    throw new CustomError(ErrorCode.USER_NOT_FOUND);
  }
  return { userNo, companyNo, infoDbNo, originTable };
}