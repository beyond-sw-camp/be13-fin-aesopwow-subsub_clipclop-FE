import { usePaymentStore } from "@/application/stores/PaymentStore";
import { PaymentUseCase } from "@/application/useCases/PaymentUseCase";
import type { PaymentRequest } from "@portone/browser-sdk/v2";

export const usePaymentViewModel = () => {
    const customer = usePaymentStore((state) => state.customer);
    const useCase = new PaymentUseCase();

    const requestPayment = async () => {
        const paymentRequest: PaymentRequest = {
            storeId: "store-5f8fa9bc-3f56-4951-8657-d3e3cc2d659d",
            channelKey: "channel-key-81e88f40-9419-409b-846c-51ef52139e1d",
            paymentId: useCase.generateOrderId(),
            orderName: "Basic 구독",
            totalAmount: 3900,
            currency: "CURRENCY_KRW",
            payMethod: "CARD",
            customer, // 하드코딩된 email 제거
        };
        try {
            const response = await useCase.requestPayment(paymentRequest);
            console.log(response);
        } catch (error) {
            console.error(error);
            alert("결제 요청에 실패했습니다.");
        }
    };

    return {
        customer,
        requestPayment,
    };
};