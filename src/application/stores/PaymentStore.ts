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
    customer: {
        fullName: "",
        phoneNumber: "",
        email: "",
    },
    setCustomer: (customer) => set({ customer }),
}));