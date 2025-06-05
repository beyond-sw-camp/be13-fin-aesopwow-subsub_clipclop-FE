// /infrastructure/repositories/UserRepository.ts

import {
  deleteUser as apiDeleteUser,
  fetchUserBasicInfo,
  fetchRoleName,
  fetchOriginTable,
  UserDeleteRequest,
} from "@/infrastructure/api/UserApi";
import { fetchMyPageUserInfo } from "@/infrastructure/api/MypageApi";
import { MyPageUserInfoResponse } from "@/core/model/MypageModel";
import { UserRole } from "@/application/stores/UserStore";

export class UserRepository {
  async deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
    return apiDeleteUser(userNo, request);
  }

  async getMyPageUserInfo(userNo: number): Promise<MyPageUserInfoResponse> {
    return fetchMyPageUserInfo(userNo);
  }

  async getUserBasicInfo(userNo: number): Promise<{
    userNo: number;
    companyNo: number;
    infoDbNo: number;
    roleNo: number;
  }> {
    return fetchUserBasicInfo(userNo);
  }

  async getRoleNameByRoleNo(roleNo: number): Promise<UserRole> {
    const name = await fetchRoleName(roleNo);
    return name as UserRole;
  }

  async getOriginTableByInfoDbNo(infoDbNo: number): Promise<string> {
    return fetchOriginTable(infoDbNo);
  }
}
