import { UserDeleteRequest } from "@/infrastructure/api/UserApi";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";

const repository = new UserRepository();

export class UserUsecase {
  async deleteUser(userNo: number): Promise<void> {
    const request: UserDeleteRequest = { isDeleted: true };
    return await repository.deleteUser(userNo, request);
  }

    // 예시로 추후 추가 될 수도 있는 기능
  async fetchUserInfo({/*userNo: number*/}): Promise<any> {
    // repository.getUserInfo(...) 등
  }
}