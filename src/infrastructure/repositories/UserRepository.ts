// /infrastructure/repositories/UserRepository.ts

import {
  deleteUser as apiDeleteUser,
  fetchUserBasicInfo,
  UserDeleteRequest,
} from "@/infrastructure/api/UserApi";
import { fetchMyPageUserInfo } from "@/infrastructure/api/MypageApi";
import { MyPageUserInfoResponse } from "@/core/model/MypageModel";
import { UserRole } from "@/application/stores/UserStore";

export interface UserBasicInfo {
  userNo: number;
  companyNo: number;
  infoDbNo: number;
  roleNo: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  companyName: string;
  departmentName: string;
  roleName: UserRole;
}

export class UserRepository {
  async deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
    return apiDeleteUser(userNo, request);
  }

  async getMyPageUserInfo(userNo: number): Promise<MyPageUserInfoResponse> {
    return fetchMyPageUserInfo(userNo);
  }

  async getUserBasicInfo(userNo: number): Promise<UserBasicInfo> {
    const res = await fetchUserBasicInfo(userNo);
    return res.data;
  }
}
