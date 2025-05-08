import { UserRepository } from "@/infrastructure/repositories/UserRepository";

export class SignupUseCase {
  async execute(name: string, email: string, password: string): Promise<void> {
    await UserRepository.signup(email, password, name);
  }
}