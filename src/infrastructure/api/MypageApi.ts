import axiosInstance from "@/infrastructure/api/Axios";
import { MyPageUserInfoResponse } from "@/core/model/MypageModel";

export async function fetchMyPageUserInfo(userNo: number): Promise<MyPageUserInfoResponse> {
  try {
    const res = await axiosInstance.get(`/mypage?userNo=${userNo}`);
    console.log("=====================")
    console.log("받은 데이터:", res.data); // 서버 응답 데이터 확인
    return res.data.data as MyPageUserInfoResponse;

  } catch (error) {
    console.error("마이페이지 사용자 정보 요청 실패:", error);
    alert('마이페이지를 불러오는데 실패하였습니다.');
    // TODO: 라우터로 던져버리기
    throw error;
  }
}
