// 📁 /infrastructure/api/UserApi.ts
import axiosInstance from "@/infrastructure/api/Axios";

export interface UserDeleteRequest {
  reason?: string;
  password?: string;
  isDeleted?: boolean;
}

export async function deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
  await axiosInstance.delete(`/user/${userNo}`, { data: request });
}

export async function fetchUserBasicInfo(userNo: number): Promise<{
  userNo: number;
  companyNo: number;
  infoDbNo: number;
  roleNo: number;
}> {
  const response = await axiosInstance.get(`/user/basic-info/${userNo}`);
  return response.data;
}

export async function fetchRoleName(roleNo: number): Promise<string> {
  const response = await axiosInstance.get(`/user/role/${roleNo}`);
  return response.data.name;
}

export async function fetchOriginTable(infoDbNo: number): Promise<string> {
  const response = await axiosInstance.get(`/user/info-column/${infoDbNo}`);
  return response.data.origin_table;
}
