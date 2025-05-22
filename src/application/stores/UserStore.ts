// /src/application/stores/UserStore.ts
// import { create } from "zustand";
// import { CustomError } from "@/error/CustomError";
// import { ErrorCode } from "@/error/ErrorCode";

// interface UserState {
//   companyNo: number | null;
//   infoDbNo: number | null;
//   originTable: string | null;
//   setCompanyNo: (companyNo: number) => void;
//   setInfoDbNo: (infoDbNo: number) => void;
//   setOriginTable: (originTable: string) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   companyNo: null,
//   infoDbNo: null,
//   originTable: null,
//   setCompanyNo: (companyNo: number) => set({ companyNo }),
//   setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
//   setOriginTable: (originTable: string) => set({ originTable }),
// }));

// // 유틸 함수: 반드시 모든 정보가 존재해야 한다는 전제
// export function getUser() {
//   const { companyNo, infoDbNo, originTable } = useUserStore.getState();
//   if (!companyNo || !infoDbNo || !originTable) {
//     throw new CustomError(ErrorCode.USER_NOT_FOUND);
//   }
//   return { companyNo, infoDbNo, originTable };
// }

// /src/application/stores/UserStore.ts
import { create } from "zustand";
import { CustomError } from "@/error/CustomError";
import { ErrorCode } from "@/error/ErrorCode";

interface UserState {
  companyNo: number | null;
  infoDbNo: number | null;
  originTable: string | null;
  setCompanyNo: (companyNo: number) => void;
  setInfoDbNo: (infoDbNo: number) => void;
  setOriginTable: (originTable: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  companyNo: 1,              // ✅ 하드코딩된 테스트 값
  infoDbNo: 1,               // ✅ 하드코딩된 테스트 값
  originTable: "subscription_user",  // ✅ 하드코딩된 테스트 값
  setCompanyNo: (companyNo: number) => set({ companyNo }),
  setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
  setOriginTable: (originTable: string) => set({ originTable }),
}));

// 유틸 함수: 반드시 모든 정보가 존재해야 한다는 전제
export function getUser() {
  const { companyNo, infoDbNo, originTable } = useUserStore.getState();
  if (!companyNo || !infoDbNo || !originTable) {
    throw new CustomError(ErrorCode.USER_NOT_FOUND);
  }
  return { companyNo, infoDbNo, originTable };
}
