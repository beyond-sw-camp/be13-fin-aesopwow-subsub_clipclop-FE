import PortOne from "@portone/browser-sdk/v2";
import type { PaymentRequest } from "@portone/browser-sdk/v2";

/**
 * 결제 요청 UseCase
 * - 실제 결제 요청 비즈니스 로직을 담당
 * - ViewModel에서 호출
 */
export class PaymentUseCase {

    
    async requestPayment(paymentRequest: PaymentRequest) {
        try {
            const response = await PortOne.requestPayment(paymentRequest);
            // 결제 성공 처리 (필요시 추가)
            alert("결제 완료되었습니다. 대시보드 페이지로 이동합니다.")
            return response;
        } catch (error) {
            // 결제 실패 처리
            alert("결제를 취소하셨습니다.")
            throw error;
        }
    }

    /**
     * 주문번호 생성 (40자 이하)
     */
    generateOrderId() {
        const uuid = crypto.randomUUID().replace(/-/g, "");
        return `pay-${uuid.substring(0, 30)}`; // pay- + 30자 = 34자
    }
}