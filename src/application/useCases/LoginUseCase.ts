import { SigninRepository } from "@/infrastructure/repositories/SigninRepository";
import { LoginResponse } from "@/core/model/LoginResponse";

export class LoginUseCase {
  async execute(email: string, password: string): Promise<LoginResponse> {
    return await SigninRepository.login(email, password);
  }
}
