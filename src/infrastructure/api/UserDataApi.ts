// /infrastructure/api/UserDataApi.ts
import axiosInstance from "@/infrastructure/api/Axios";

// MARK: - 유저 데이터 필터링 API
export async function fetchUserDataSearchResultApi(clusterType: string, fields: string[]) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/single/user-data", {
      clusterType,
      fields,
    });
    return res.data; // ✅ { tableData: [...] } 구조
  } catch (err) {
    console.error("User Data API 요청 실패:", err);
    throw err;
  }
}