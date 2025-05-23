import axiosInstance from "./Axios";

export interface UserDeleteRequest {
  isDeleted: boolean;
}

export async function deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
    console.log("🔔 deleteUser 호출됨:", userNo, request);
    console.log("📦 request JSON:", JSON.stringify(request));
  await axiosInstance.post(`/user?userNo=${userNo}`, request);
}