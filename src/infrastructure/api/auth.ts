import axios from "axios";
import type { UserDto } from "@/core/model/User";

// 회원가입 요청
export const signupApi = async (email: string, password: string, name: string): Promise<void> => {
  await axios.post("/api/auth/signup", { email, password, name });
};

// 로그인 요청
export const loginApi = async (
  email: string,
  password: string
): Promise<UserDto> => {
  const response = await axios.post("/api/auth/login", { email, password });
  return response.data;
};

