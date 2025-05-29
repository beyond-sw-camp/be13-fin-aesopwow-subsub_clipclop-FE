import { EmailCheckApi, SignupOtpApi, VerifyOtpApi, SignupApi } from "../api/auth";
import type { CheckEmailResponse } from "@/core/model/CheckEmail";
import type { SignupRequestOtp } from "@/core/model/SignupRequestOtp";


export const SignupRepository = {
  emailcheck: async (email: string): Promise<CheckEmailResponse> => {
    const response = await EmailCheckApi({email}); 
    return response;
  },

  signupOtp: async (email: string, password: string, name: string): Promise<SignupRequestOtp> => {
    const response = await SignupOtpApi(email, password, name);
    return response;
  },

  verifyotp: async (email: string, otp: string): Promise<string> => { 
    const response = await VerifyOtpApi(email, otp);
    return response; 
  },

  signup: async (email: string, password: string, confirmPassword:string, name:string): Promise<string> => {
    const response = await SignupApi(email, password, confirmPassword, name);
    return response;
  }
};
