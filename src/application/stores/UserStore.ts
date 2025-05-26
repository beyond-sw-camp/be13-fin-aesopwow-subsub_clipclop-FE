// // 📁 src/application/stores/UserStore.ts
// import { create } from 'zustand';
// import { CustomError } from '@/error/CustomError';
// import { ErrorCode } from '@/error/ErrorCode';

// type UserRole = 'USER' | 'ADMIN' | null;

// interface UserState {
//   companyNo: number | null;
//   infoDbNo: number | null;
//   originTable: string | null;
//   role: UserRole;
//   setCompanyNo: (companyNo: number) => void;
//   setInfoDbNo: (infoDbNo: number) => void;
//   setOriginTable: (originTable: string) => void;
//   setRole: (role: UserRole) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   companyNo: null,
//   infoDbNo: null,
//   originTable: null,
//   role: null,
//   setCompanyNo: (companyNo) => set({ companyNo }),
//   setInfoDbNo: (infoDbNo) => set({ infoDbNo }),
//   setOriginTable: (originTable) => set({ originTable }),
//   setRole: (role) => set({ role }),
// }));

// // ✅ 유틸 함수: 로그인 후 모든 값이 세팅돼 있어야 함
// export function getUser() {
//   const { companyNo, infoDbNo, originTable, role } = useUserStore.getState();
//   if (!companyNo || !infoDbNo || !originTable || !role) {
//     throw new CustomError(ErrorCode.USER_NOT_FOUND);
//   }
//   return { companyNo, infoDbNo, originTable, role };
// }

// /src/application/stores/UserStore.ts
import { create } from 'zustand';
import { CustomError } from '@/error/CustomError';
import { ErrorCode } from '@/error/ErrorCode';

type UserRole = 'USER' | 'ADMIN' | null;

interface UserState {
  companyNo: number | null;
  infoDbNo: number | null;
  originTable: string | null;
  role: UserRole;
  setCompanyNo: (companyNo: number) => void;
  setInfoDbNo: (infoDbNo: number) => void;
  setOriginTable: (originTable: string) => void;
  setRole: (role: UserRole) => void;
}

export const useUserStore = create<UserState>((set) => ({
  companyNo: 1, // ✅ 하드코딩
  infoDbNo: 1,
  originTable: 'subscription_user',
  role: 'ADMIN', // ✅ 하드코딩된 기본 테스트 값
  setCompanyNo: (companyNo) => set({ companyNo }),
  setInfoDbNo: (infoDbNo) => set({ infoDbNo }),
  setOriginTable: (originTable) => set({ originTable }),
  setRole: (role) => set({ role }),
}));

// ✅ 유틸 함수: 로그인 상태 + 관리자 확인 가능
export function getUser() {
  const { companyNo, infoDbNo, originTable, role } = useUserStore.getState();
  if (!companyNo || !infoDbNo || !originTable || !role) {
    throw new CustomError(ErrorCode.USER_NOT_FOUND);
  }
  return { companyNo, infoDbNo, originTable, role };
}