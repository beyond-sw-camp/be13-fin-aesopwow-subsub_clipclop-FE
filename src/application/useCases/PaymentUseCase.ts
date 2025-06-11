import PortOne from "@portone/browser-sdk/v2";
import type { PaymentRequest } from "@portone/browser-sdk/v2";
import type { NavigateFunction } from "react-router-dom";

/**
 * 결제 요청 UseCase
 * - 실제 결제 요청 비즈니스 로직을 담당
 * - ViewModel에서 호출
 */
export class PaymentUseCase {

    
    async requestPayment(paymentRequest: PaymentRequest, navigate: NavigateFunction) {
        try {
            const response = await PortOne.requestPayment(paymentRequest) as {
                code?: string;
                transactionType?: string;
                paymentId?: string;
                txId?: string;
                message?: string;
                pgMessage?: string;
            };
            console.log("Payment response:", response);

            // 결제 실패 처리 (필요시 추가)
            if (response.code === "FAILURE_TYPE_PG" || response.code === "CANCELED") {
                alert("결제를 취소했습니다.");
                return null;
            }

            // 결제 성공 판단
            if (response.transactionType === "PAYMENT") {
                alert("결제 완료되었습니다. 대시보드 페이지로 이동합니다.");
                navigate("/dash-board");
                return response;
            }

            // 그 외 실패 처리
            alert(`결제에 실패했습니다: ${response.message || response.pgMessage || "알 수 없는 오류"}`);
            return null;
         
        } catch (error: any) {
            const failReason = error?.message || "결제가 실패했습니다.";
            if (failReason.includes("사용자가 결제를 취소")) {
                alert("결제를 취소했습니다.");
            // 결제 실패 처리
        } else {
            alert(`로그인 후 가능한 기능입니다. `);
        }
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