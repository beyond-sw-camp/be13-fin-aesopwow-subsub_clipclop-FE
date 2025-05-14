import { SignupRepository } from "@/infrastructure/repositories/SignupRepository";
import type { CheckEmailResponse } from "@/core/model/CheckEmail";
import type { SignupRequestOtp } from "@/core/model/SignupRequestOtp";
import type { OtpVerificationRequest } from "@/core/model/OtpVerificationRequest";

export class EmailCheckUseCase {
  async execute(email: string): Promise<CheckEmailResponse> {
    try {
      // 이메일을 넘겨주고 응답 받기
      const res: CheckEmailResponse = await SignupRepository.emailcheck(email);
      return { email: res.email, available: res.available }; // 이메일과 사용 가능 여부 반환
    } catch (error) {
      console.error("이메일 중복 확인 실패", error);
      throw error; // 에러가 발생하면 호출한 곳에서 처리하도록 던짐
    }
  }
}

export class CreateAccountUseCase {
  async execute(email: string, password: string, name:string): Promise<SignupRequestOtp> {
      const res = await SignupRepository.signupOtp(email, password, name);
      return res;
  };
};

export class ModalSignupUseCase {
  async verifyotp(email: string, otp: string): Promise<OtpVerificationRequest> {
      const res = await SignupRepository.verifyotp(email, otp);
      return res;
  };

  async signup(email: string, password: string, name: string): Promise<SignupRequestOtp> {
      const res = await SignupRepository.signup(email, password, name);
      return res;
    };
};