// src/application/useCases/LoginUseCase.ts
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import type { UserDto } from "@/core/model/User";

export class LoginUseCase {
  async execute(email: string, password: string): Promise<UserDto> {
    return await UserRepository.login(email, password); // UserRepository가 객체라면 이렇게 호출
  }
}
