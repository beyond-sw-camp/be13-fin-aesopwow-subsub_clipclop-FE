import { deleteUser, UserDeleteRequest } from "@/infrastructure/api/UserApi";

export class UserRepository {
  async deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
    return await deleteUser(userNo, request);
  }
}