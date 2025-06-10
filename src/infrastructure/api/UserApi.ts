// /infrastructure/api/UserApi.ts

import { UserRole } from "@/application/stores/UserStore";
import axiosInstance from "@/infrastructure/api/Axios";

export interface UserDeleteRequest {
  reason?: string;
  password?: string;
  isDeleted?: boolean;
}

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

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// 관리자 계정으로 직원을 삭제(추후 개발)
// export async function deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
//   await axiosInstance.delete(`/user/${userNo}`, { data: request });
// }

export async function deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
  await axiosInstance.post(`/user/${userNo}`, request);
}

// export async function fetchUserBasicInfo(userNo: number): Promise<ApiResponse<UserBasicInfo>> {
//   const response = await axiosInstance.get(`/user/basic-info/${userNo}`);
//   return response.data;
// } 

export async function fetchUserBasicInfo(userNo: number): Promise<ApiResponse<UserBasicInfo>> {
  const response = await axiosInstance.get('/user/my');
  return response.data;
}
