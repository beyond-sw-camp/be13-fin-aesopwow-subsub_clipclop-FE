import axiosInstance from "@/infrastructure/api/Axios";
import { MyPageUserInfoResponse } from "@/core/model/MypageModel";

/**
 * Fetch user information for MyPage by userNo
 * @param userNo - User number identifier
 * @returns Promise resolving to MyPageUserInfoResponse
 * @throws Error if request fails
 */
export async function fetchMyPageUserInfo(userNo: number): Promise<MyPageUserInfoResponse> {
  try {
    const response = await axiosInstance.get<{ data: MyPageUserInfoResponse }>(`/mypage?userNo=${userNo}`);
    // console.debug("MyPage user info response:", response.data); // 개발 환경에서만 사용
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch MyPage user info:", error);
    alert('마이페이지를 불러오는데 실패하였습니다.');
    // TODO: Consider redirecting user or handling error state
    throw error;
  }
}
