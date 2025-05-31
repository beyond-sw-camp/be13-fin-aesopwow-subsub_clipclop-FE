import axiosInstance from "@/infrastructure/api/Axios";

export interface UserDeleteRequest {
    reason?: string;
    password?: string;
    isDeleted?: boolean;
}

export async function deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
    await axiosInstance.delete(`/user/${userNo}`, { data: request });
}