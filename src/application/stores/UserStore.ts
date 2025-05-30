import { create } from 'zustand';
import { CustomError } from '@/error/CustomError';
import { ErrorCode } from '@/error/ErrorCode';

type UserRole = 'USER' | 'ADMIN' | null;

export interface UserState {
    userNo: number | null;
    companyNo: number | null;
    infoDbNo: number | null;
    originTable: string | null;
    role: UserRole;
    roleNo: number | null;

    // 고객 정보
    name: string;
    phone: string;
    email: string;

    // Setter
    setUserNo: (userNo: number) => void;
    setCompanyNo: (companyNo: number) => void;
    setInfoDbNo: (infoDbNo: number) => void;
    setOriginTable: (originTable: string) => void;
    setRole: (role: UserRole) => void;
    setRoleNo: (roleNo: number) => void;

    setName: (name: string) => void;
    setPhone: (phone: string) => void;
    setEmail: (email: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    // 권한/식별자 정보
    userNo: null,
    companyNo: null,
    infoDbNo: null,
    originTable: null,
    role: null,
    roleNo: null,

    // 고객 정보
    name: "",
    phone: "",
    email: "",

    // Setter
    setUserNo: (userNo: number) => set({ userNo }),
    setCompanyNo: (companyNo: number) => set({ companyNo }),
    setInfoDbNo: (infoDbNo: number) => set({ infoDbNo }),
    setOriginTable: (originTable: string) => set({ originTable }),
    setRole: (role: UserRole) => set({ role }),
    setRoleNo: (roleNo: number) => set({ roleNo }),

    setName: (name: string) => set({ name }),
    setPhone: (phone: string) => set({ phone }),
    setEmail: (email: string) => set({ email }),
}));

/**
 * 유틸 함수: 로그인 상태 + 관리자 여부 확인 포함
 */
export function getUser() {
    const {
        userNo, companyNo, infoDbNo, originTable, role, roleNo,
        name, phone, email
    } = useUserStore.getState();
    
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
    return {
        userNo, companyNo, infoDbNo, originTable, role, roleNo,
        name, phone, email
    };
}