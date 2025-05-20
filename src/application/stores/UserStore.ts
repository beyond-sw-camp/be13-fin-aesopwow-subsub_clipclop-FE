// // /src/application/stores/UserStore.ts
// import { create } from "zustand";
// import { CustomError } from "@/error/CustomError";
// import { ErrorCode } from "@/error/ErrorCode";

// interface UserState {
//   companyNo: number | null;
//   infoDbNo: number | null;
//   setCompanyNo: (companyNo: number) => void;
//   setInfoDbNo: (infoDbNo: number) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   companyNo: null,
//   infoDbNo: null,
//   setCompanyNo: (companyNo: number) => set({ companyNo }),
//   setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
// }));

// // 유틸 함수: 반드시 companyNo가 존재해야 한다는 전제
// export function getUser() {
//   const { companyNo } = useUserStore.getState();
//   if (!companyNo) {
//     throw new CustomError(ErrorCode.USER_NOT_FOUND);
//   }
//   return { companyNo };
// }

// // 유틸 함수: 반드시 infoDbNo가 존재해야 한다는 전제
// export function getInfoDb() {
//   const { infoDbNo } = useUserStore.getState();
//   if (!infoDbNo) {
//     throw new CustomError(ErrorCode.DB_INFO_NOT_FOUND); // 필요 시 ErrorCode에 추가
//   }
//   return { infoDbNo };
// }

// /src/application/stores/UserStore.ts
import { create } from "zustand";

interface UserState {
  companyNo: number | null;
  infoDbNo: number | null;
  setCompanyNo: (companyNo: number) => void;
  setInfoDbNo: (infoDbNo: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  companyNo: null,
  infoDbNo: null,
  setCompanyNo: (companyNo: number) => set({ companyNo }),
  setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
}));

// 유틸 함수: 반드시 companyNo가 존재해야 한다는 전제
export function getUser() {
  return { companyNo: 1 };
}

// 유틸 함수: 반드시 infoDbNo가 존재해야 한다는 전제
export function getInfoDb() {
  return { infoDbNo: 1 };
}