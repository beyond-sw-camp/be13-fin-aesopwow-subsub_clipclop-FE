import axios from "axios";
import type { LoginResponse } from "@/core/model/LoginResponse"
import type { CheckEmailRequest, CheckEmailResponse } from "@/core/model/CheckEmail"; 
import type { SignupRequestOtp } from "@/core/model/SignupRequestOtp";
import type { OtpVerificationRequest } from "@/core/model/OtpVerificationRequest";

export const loginApi = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post("/api/auth/login", { email, password });
  return response.data;
}

export const EmailCheckApi = async (
  payload: CheckEmailRequest
): Promise<CheckEmailResponse> => {
  try {
    const response = await axios.post<CheckEmailResponse>("api/auth/email-check", payload);
    const result = response.data; // 응답이 문자열인 경우 파싱하여 객체로 변환

    if (typeof result === "string") {
      return { email: payload.email, available: true }; 
    }

    return result; 
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      return { email: payload.email, available: false };
    } else {
      throw new Error("이메일 확인 중 예기치 못한 오류가 발생했습니다.");
    }
  }
};

export const SignupOtpApi = async (
  email: string,
  password: string
): Promise<SignupRequestOtp> => {
  const requestData = { email, password };
  console.log("Request data:", requestData);  // 해내면 지우겟음.
  const response = await axios.post("api/auth/signup/otp", requestData);
  return response.data;
}

export const VerifyOtpApi = async (
  email: string,
  otp: string
): Promise<string> => {
  const payload: OtpVerificationRequest = { email, otp, success: false };
  const response = await axios.post("api/auth/signup/verify-otp", payload);
  return response.data;
};

export const SignupApi = async (
  email: string,
  password: string
): Promise<string> => {
  const payload: SignupRequestOtp = { email, password };
  const response = await axios.post("api/auth/signup", payload);
  return response.data;
};
