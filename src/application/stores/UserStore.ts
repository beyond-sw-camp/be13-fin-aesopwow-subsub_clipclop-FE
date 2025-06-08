import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CustomError } from "@/error/CustomError";
import { ErrorCode } from "@/error/ErrorCode";
import axiosInstance from "@/infrastructure/api/Axios";

export type UserRole = "USER" | "ADMIN" | null;

export interface UserState {
    userNo: number | null;
    infoDbNo: number | null;
    originTable: string | null;
    role: UserRole;
    roleNo: number | null;
    name: string;
    phone: string;
    email: string;
    departmentName: string;
    companyNo: number | null;
    setUserNo: (userNo: number) => void;
    setInfoDbNo: (infoDbNo: number) => void;
    setOriginTable: (originTable: string) => void;
    setRole: (role: UserRole) => void;
    setRoleNo: (roleNo: number) => void;
    setName: (name: string) => void;
    setPhone: (phone: string) => void;
    setEmail: (email: string) => void;
    setDepartmentName: (departmentName: string) => void;
    setCompanyNo: (companyNo: number) => void;
    reset: () => void;
}

export const useUserStore = create(
    persist<UserState>(
        (set) => ({
            userNo: null,
            infoDbNo: null,
            originTable: null,
            role: null,
            roleNo: null,
            name: "",
            phone: "",
            email: "",
            departmentName: "",
            companyNo: null,
            setUserNo: (userNo) => set({ userNo }),
            setInfoDbNo: (infoDbNo) => set({ infoDbNo }),
            setOriginTable: (originTable) => set({ originTable }),
            setRole: (role) => set({ role }),
            setRoleNo: (roleNo) => set({ roleNo }),
            setName: (name) => set({ name }),
            setPhone: (phone) => set({ phone }),
            setEmail: (email) => set({ email }),
            setDepartmentName: (departmentName) => set({ departmentName }),
            setCompanyNo: (companyNo) => set({ companyNo }),
            reset: () =>
                set({
                    userNo: null,
                    infoDbNo: null,
                    originTable: null,
                    role: null,
                    roleNo: null,
                    name: "",
                    phone: "",
                    email: "",
                    departmentName: "",
                    companyNo: null,
                }),
        }),
        { name: "user-store" }
    )
);

export async function getUser() {
    const { userNo } = useUserStore.getState();

    const response = await axiosInstance.get("/user?userNo=" + userNo);

    const { infoDbNo, originTable, role, roleNo, name, phone, email, departmentName, companyNo } = response.data;

    console.log(response);
    console.log(userNo, infoDbNo, originTable, role, roleNo, name, phone, email, departmentName, companyNo);

    if (
        userNo === null ||
        infoDbNo === null ||
        originTable === null ||
        role === null ||
        roleNo === null
    ) {
        throw new CustomError(ErrorCode.USER_NOT_FOUND);
    }
    return { userNo, infoDbNo, originTable, role, roleNo, name, phone, email };
}