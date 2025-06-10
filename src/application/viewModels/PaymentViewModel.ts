import { useEffect } from "react";
import { usePaymentStore } from "@/application/stores/PaymentStore";
import { useUserStore } from "@/application/stores/UserStore";
import { PaymentUseCase } from "@/application/useCases/PaymentUseCase";
import type { PaymentRequest } from "@portone/browser-sdk/v2";
import { useNavigate } from 'react-router-dom';

export const usePaymentViewModel = () => {
    const { name, phone, email } = useUserStore();
    const customer = usePaymentStore((state) => state.customer);
    const setCustomer = usePaymentStore((state) => state.setCustomer);
    const useCase = new PaymentUseCase();
    const navigate = useNavigate()

    useEffect(() => {
        setCustomer({
            fullName: name,
            phoneNumber: phone,
            email: email,
        });
    }, [name, phone, email, setCustomer]);

    const requestPayment = async ({
        orderName,
        totalAmount,
    }: { orderName: string; totalAmount: number }) => {
        const paymentRequest: PaymentRequest = {
            storeId: "store-5f8fa9bc-3f56-4951-8657-d3e3cc2d659d",
            channelKey: "channel-key-81e88f40-9419-409b-846c-51ef52139e1d",
            paymentId: useCase.generateOrderId(),
            orderName,
            totalAmount,
            currency: "CURRENCY_KRW",
            payMethod: "CARD",
            customer,
        };
        try {
            await useCase.requestPayment(paymentRequest);
            navigate("/dash-board");
            // console.log(response);
        } catch (error) {
            // console.error(error);
            alert("결제 요청에 실패했습니다.");
        }
    };

    return {
        customer,
        requestPayment,
    };
};