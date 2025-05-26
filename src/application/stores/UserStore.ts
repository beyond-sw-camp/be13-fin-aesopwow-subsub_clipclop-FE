// // 📁 src/application/stores/UserStore.ts
// import { create } from 'zustand';
// import { CustomError } from '@/error/CustomError';
// import { ErrorCode } from '@/error/ErrorCode';

// type UserRole = 'USER' | 'ADMIN' | null;

// interface UserState {
//   userNo: number | null;
//   companyNo: number | null;
//   infoDbNo: number | null;
//   originTable: string | null;
//   role: UserRole;
//   setUserNo: (userNo: number) => void;
//   setCompanyNo: (companyNo: number) => void;
//   setInfoDbNo: (infoDbNo: number) => void;
//   setOriginTable: (originTable: string) => void;
//   setRole: (role: UserRole) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   userNo: null,
//   companyNo: null,
//   infoDbNo: null,
//   originTable: null,
//   role: null,
//   setUserNo: (userNo: number) => set({ userNo }),
//   setCompanyNo: (companyNo: number) => set({ companyNo }),
//   setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
//   setOriginTable: (originTable: string) => set({ originTable }),
//   setRole: (role: UserRole) => set({ role }),
// }));

// // ✅ 유틸 함수: 로그인 후 모든 값이 세팅돼 있어야 함
// export function getUser() {
//   const { userNo, companyNo, infoDbNo, originTable, role } = useUserStore.getState();
//   if (!userNo || !companyNo || !infoDbNo || !originTable || !role) {
//     throw new CustomError(ErrorCode.USER_NOT_FOUND);
//   }
//   return { userNo, companyNo, infoDbNo, originTable, role };
// }

// /src/application/stores/UserStore.ts

import { create } from 'zustand';
import { CustomError } from '@/error/CustomError';
import { ErrorCode } from '@/error/ErrorCode';

type UserRole = 'USER' | 'ADMIN' | null;

interface UserState {
  userNo: number | null;
  companyNo: number | null;
  infoDbNo: number | null;
  originTable: string | null;
  role: UserRole;
  setUserNo: (userNo: number) => void;
  setCompanyNo: (companyNo: number) => void;
  setInfoDbNo: (infoDbNo: number) => void;
  setOriginTable: (originTable: string) => void;
  setRole: (role: UserRole) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userNo: 1, // ✅ 테스트용 기본값
  companyNo: 1,
  infoDbNo: 1,
  originTable: 'subscription_user',
  role: 'ADMIN', // ✅ 기본값
  setUserNo: (userNo: number) => set({ userNo }),
  setCompanyNo: (companyNo: number) => set({ companyNo }),
  setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
  setOriginTable: (originTable: string) => set({ originTable }),
  setRole: (role: UserRole) => set({ role }),
}));

// ✅ 유틸 함수: 로그인 상태 + 관리자 여부 확인 포함
export function getUser() {
  const { userNo, companyNo, infoDbNo, originTable, role } = useUserStore.getState();
  if (!userNo || !companyNo || !infoDbNo || !originTable || !role) {
    throw new CustomError(ErrorCode.USER_NOT_FOUND);
  }
  return { userNo, companyNo, infoDbNo, originTable, role };
}