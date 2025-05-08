// UserRepository.ts
import { loginApi, signupApi } from "../api/auth";
import type { UserDto } from "@/core/model/User";

export const UserRepository = {
  signup: async (email: string, password: string, name: string): Promise<void> => {
    await signupApi(email, password, name);
  },

  login: async (email: string, password: string): Promise<UserDto> => {
    return await loginApi(email, password);
  },
};
