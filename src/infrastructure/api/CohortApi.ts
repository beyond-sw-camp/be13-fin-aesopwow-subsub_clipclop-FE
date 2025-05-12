// /infrastructure/api/CohortApi.ts
import axiosInstance from "@/infrastructure/api/Axios.ts";
import { getUser } from "@/application/stores/UserStore.ts";

// MARK: - Single 시각화
export async function fetchSingleVisualizationApi(clusterType: string) {
  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/single/visualization", {
      companyNo,
      clusterType,
    });
    return res.data;
  } catch (err) {
    console.error("SingleVisualization API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Single 인사이트
export async function fetchSingleInsightApi(clusterType: string) {
  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/single/insight", {
      companyNo,
      clusterType,
    });
    return res.data;
  } catch (err) {
    console.error("SingleInsight API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Single 히트맵
export async function fetchSingleRemainHeatmapApi(clusterType: string) {
  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/single/remain-heatmap", {
      companyNo,
      clusterType,
    });
    return res.data;
  } catch (err) {
    console.error("SingleRemainHeatmap API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Single 유저 데이터
export async function fetchSingleUserDataSearchResultApi(clusterType: string, fields: string[]) {
  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/single/user-data", {
      companyNo,
      clusterType,
      fields,
    });
    return res.data;
  } catch (err) {
    console.error("SingleUserData API 요청 실패:", err);
    throw err;
  }
}

// MARK: - Double 시각화
export async function fetchDoubleVisualizationApi(firstClusterType: string, secondClusterType: string) {
  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/double/visualization", {
      companyNo,
      firstClusterType,
      secondClusterType,
    });
    return res.data;
  } catch (err) {
    console.error("DoubleVisualization API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Double 인사이트
export async function fetchDoubleInsightApi(firstClusterType: string, secondClusterType: string) {
  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/double/insight", {
      companyNo,
      firstClusterType,
      secondClusterType,
    });
    return res.data;
  } catch (err) {
    console.error("DoubleInsight API 요청 실패:", err);
    throw err;
  }
}

// MARK: - Double 히트맵
export async function fetchDoubleRemainHeatmapApi(firstClusterType: string, secondClusterType: string) {
  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/double/remain-heatmap", {
      companyNo,
      firstClusterType,
      secondClusterType,
    });
    return res.data;
  } catch (err) {
    console.error("DoubleRemainHeatmap API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Double 유저 데이터
export async function fetchDoubleUserDataSearchResultApi(firstClusterType: string, secondClusterType: string, fields: string[]) {
  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/double/user-data", {
      companyNo,
      firstClusterType,
      secondClusterType,
      fields,
    });
    return res.data;
  } catch (err) {
    console.error("DoubleUserData API 요청 실패:", err);
    throw err;
  }
}