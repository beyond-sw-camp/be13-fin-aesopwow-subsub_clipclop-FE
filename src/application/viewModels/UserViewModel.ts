import { UserUsecase } from "../useCases/userUsecase";

export class UserViewModel {
  private usecase: UserUsecase;

  constructor() {
    this.usecase = new UserUsecase();
  }

  async deleteUser(userNo: number): Promise<void> {
    await this.usecase.deleteUser(userNo);
  }
}