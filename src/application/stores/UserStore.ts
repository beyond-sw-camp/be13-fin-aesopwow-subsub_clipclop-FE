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
//   roleNo: number | null; // ✅ 숫자 기반 권한 추가
//   setUserNo: (userNo: number) => void;
//   setCompanyNo: (companyNo: number) => void;
//   setInfoDbNo: (infoDbNo: number) => void;
//   setOriginTable: (originTable: string) => void;
//   setRole: (role: UserRole) => void;
//   setRoleNo: (roleNo: number) => void; // ✅ setter 추가
// }

// export const useUserStore = create<UserState>((set) => ({
//   userNo: null,
//   companyNo: null,
//   infoDbNo: null,
//   originTable: null,
//   role: null,
//   roleNo: null, // ✅ 초기값 null
//   setUserNo: (userNo: number) => set({ userNo }),
//   setCompanyNo: (companyNo: number) => set({ companyNo }),
//   setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
//   setOriginTable: (originTable: string) => set({ originTable }),
//   setRole: (role: UserRole) => set({ role }),
//   setRoleNo: (roleNo: number) => set({ roleNo }), // ✅
// }));

// // ✅ 유틸 함수: 로그인 후 모든 값이 세팅돼 있어야 함
// export function getUser() {
//   const { userNo, companyNo, infoDbNo, originTable, role, roleNo } = useUserStore.getState();
//   if (!userNo || !companyNo || !infoDbNo || !originTable || !role || roleNo === null) {
//     throw new CustomError(ErrorCode.USER_NOT_FOUND);
//   }
//   return { userNo, companyNo, infoDbNo, originTable, role, roleNo };
// }


// /src/application/stores/UserStore.ts

// 📁 src/application/stores/UserStore.ts
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
  roleNo: number | null; // ✅ 숫자 기반 권한 추가
  setUserNo: (userNo: number) => void;
  setCompanyNo: (companyNo: number) => void;
  setInfoDbNo: (infoDbNo: number) => void;
  setOriginTable: (originTable: string) => void;
  setRole: (role: UserRole) => void;
  setRoleNo: (roleNo: number) => void; // ✅ setter 추가
}

export const useUserStore = create<UserState>((set) => ({
  userNo: 1, // 테스트용 기본값
  companyNo: 1,
  infoDbNo: 1,
  originTable: 'subscription_user',
  role: 'ADMIN',
  roleNo: 1, // ✅ 1: ADMIN, 4: USER
  setUserNo: (userNo: number) => set({ userNo }),
  setCompanyNo: (companyNo: number) => set({ companyNo }),
  setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
  setOriginTable: (originTable: string) => set({ originTable }),
  setRole: (role: UserRole) => set({ role }),
  setRoleNo: (roleNo: number) => set({ roleNo }), // ✅
}));

// ✅ 유틸 함수: 로그인 상태 + 관리자 여부 확인 포함
export function getUser() {
  const { userNo, companyNo, infoDbNo, originTable, role, roleNo } = useUserStore.getState();
  if (!userNo || !companyNo || !infoDbNo || !originTable || !role || roleNo === null) {
    throw new CustomError(ErrorCode.USER_NOT_FOUND);
  }
  return { userNo, companyNo, infoDbNo, originTable, role, roleNo };
}
