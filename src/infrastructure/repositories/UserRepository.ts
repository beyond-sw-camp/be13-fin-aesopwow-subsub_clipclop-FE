import { deleteUser as apiDeleteUser, UserDeleteRequest, fetchMyInfo, MyInfoResponse } from "@/infrastructure/api/UserApi";
import { fetchMyPageUserInfo } from "@/infrastructure/api/MypageApi";
import { MyPageUserInfoResponse } from "@/core/model/MypageModel";

export class UserRepository {
    async deleteUser(userNo: number, request: UserDeleteRequest): Promise<void> {
        return apiDeleteUser(userNo, request);
    }

    async fetchMyInfo(): Promise<MyInfoResponse> {
        return fetchMyInfo();
    }

    async getMyPageUserInfo(userNo: number): Promise<MyPageUserInfoResponse> {
        return fetchMyPageUserInfo(userNo);
    }
}