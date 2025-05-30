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
  roleNo: number | null;
  setUserNo: (userNo: number) => void;
  setCompanyNo: (companyNo: number) => void;
  setInfoDbNo: (infoDbNo: number) => void;
  setOriginTable: (originTable: string) => void;
  setRole: (role: UserRole) => void;
  setRoleNo: (roleNo: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userNo: null,           // 실제 초기값은 null로
  companyNo: null,
  infoDbNo: null,
  originTable: null,
  role: null,
  roleNo: null,
  setUserNo: (userNo: number) => set({ userNo }),
  setCompanyNo: (companyNo: number) => set({ companyNo }),
  setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
  setOriginTable: (originTable: string) => set({ originTable }),
  setRole: (role: UserRole) => set({ role }),
  setRoleNo: (roleNo: number) => set({ roleNo }),
}));

// 유틸 함수: 로그인 상태 + 관리자 여부 확인 포함
export function getUser() {
  const { userNo, companyNo, infoDbNo, originTable, role, roleNo } = useUserStore.getState();
  // null 체크로 수정 (0도 허용)
  if (
    userNo === null ||
    companyNo === null ||
    infoDbNo === null ||
    originTable === null ||
    role === null ||
    roleNo === null
  ) {
    throw new CustomError(ErrorCode.USER_NOT_FOUND);
  }
  return { userNo, companyNo, infoDbNo, originTable, role, roleNo };
}