import { create } from "zustand";

export interface CustomerInfo {
    fullName: string;
    phoneNumber: string;
    email: string;
}

interface PaymentState {
    customer: CustomerInfo;
    setCustomer: (customer: CustomerInfo) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
    //FIXME: - 해당 정보는 회원가입시에 받아오게끔
    customer: {
        fullName: "유재우",
        phoneNumber: "010-3443-2655",
        email: "yjw127588@gmail.com",
    },
    setCustomer: (customer) => set({ customer }),
}));