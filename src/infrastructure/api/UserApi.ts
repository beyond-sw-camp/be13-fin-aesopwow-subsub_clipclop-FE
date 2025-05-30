import axiosInstance from "@/infrastructure/api/Axios";

export interface UserDeleteRequest {
    reason?: string;
    password?: string;
}

export async function deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
    await axiosInstance.delete(`/user/${userNo}`, { data: request });
}

export interface MyInfoResponse {
    userNo: number;
    // 필요시 username, email 등 추가
}

export async function fetchMyInfo(): Promise<MyInfoResponse> {
    const response = await axiosInstance.get<{ data: MyInfoResponse }>("/api/me");
    return response.data.data;
}