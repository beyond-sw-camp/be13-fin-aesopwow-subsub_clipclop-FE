// /infrastructure/api/CohortApi.ts
import axiosInstance from "@/infrastructure/api/Axios.ts";

// MARK: - 시각화 API
export async function fetchVisualizationApi(companyNo: number, clusterType: string) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/single/visualization", {
      companyNo,
      clusterType,
    });
    return res.data;
  } catch (err) {
    console.error("Visualization API 요청 에러:", err);
    throw err;
  }
}

// MARK: - 인사이트 API
export async function fetchInsightApi(companyNo: number, clusterType: string) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/single/insight", {
      companyNo,
      clusterType,
    });
    return res.data;
  } catch (err) {
    console.error("Insight API 요청 에러:", err);
    throw err;
  }
}

// MARK: - 리텐션 히트맵 API
export async function fetchRemainHeatmapApi(companyNo: number, clusterType: string) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/single/remain-heatmap", {
      companyNo,
      clusterType,
    });
    return res.data;
  } catch (err) {
    console.error("RemainHeatmap API 요청 에러:", err);
    throw err;
  }
}
