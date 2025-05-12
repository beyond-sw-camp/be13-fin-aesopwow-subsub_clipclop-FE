import axiosInstance from "@/infrastructure/api/Axios";
import { MyPageUserInfoResponse } from "@/core/model/MypageModel";

// 마이페이지 사용자 정보 가져오기
export async function fetchMyPageUserInfo(): Promise<MyPageUserInfoResponse> {
  try {
    const response = await axiosInstance.get("/api/v1/mypage");
    return response.data;
  } catch (error) {
    console.error("마이페이지 사용자 정보 요청 실패:", error);
    
    return {
      username: "홍길동",
      companyName: "beyond",
      membership: "basic",
      membership_expired_at: "2025-05-30",
    };
  }
}
