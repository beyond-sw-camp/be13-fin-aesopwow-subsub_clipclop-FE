// /infrastructure/api/cohortApi.ts
import axiosInstance from "@/infrastructure/api/axios";

// MARK: - 행동 패턴 API
export async function fetchBehaviorPatternApi(companyNo: number) {
  try {
    const res = await axiosInstance.post("/cohorts/behavior-pattern", { companyNo });
    return res.data;
  } catch (err) {
    console.error("BehaviorPattern API 요청 에러:", err);
    throw err;
  }
}

// MARK: - 인사이트 API
export async function fetchInsightApi(companyNo: number) {
  try {
    const res = await axiosInstance.post("/cohorts/insight", { companyNo });
    return res.data;
  } catch (err) {
    console.error("Insight API 요청 에러:", err);
    throw err;
  }
}

// MARK: - 리텐션 히트맵 API
export async function fetchRemainHeatmapApi(companyNo: number) {
  try {
    const res = await axiosInstance.post("/cohorts/remain-heatmap", { companyNo });
    return res.data;
  } catch (err) {
    console.error("RemainHeatmap API 요청 에러:", err);
    throw err;
  }
}