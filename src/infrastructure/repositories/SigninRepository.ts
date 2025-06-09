import type { LoginResponse } from "@/core/model/LoginResponse";
import { loginApi } from "../api/auth";



export const SigninRepository = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    return await loginApi(email, password);
  },
}