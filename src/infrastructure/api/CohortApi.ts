// /infrastructure/api/CohortApi.ts
import axiosInstance from "@/infrastructure/api/Axios.ts";

// MARK: - Single 시각화
export async function fetchSingleVisualizationApi(companyNo: number, clusterType: string) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/single/visualization", {
      companyNo,
      clusterType,
    });
    return res.data; // { imageBase64A, imageBase64B }
  } catch (err) {
    console.error("SingleVisualization API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Single 인사이트
export async function fetchSingleInsightApi(companyNo: number, clusterType: string) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/single/insight", {
      companyNo,
      clusterType,
    });
    return res.data; // { content }
  } catch (err) {
    console.error("SingleInsight API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Single 히트맵
export async function fetchSingleRemainHeatmapApi(companyNo: number, clusterType: string) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/single/remain-heatmap", {
      companyNo,
      clusterType,
    });
    return res.data; // { content, columnLabels, dataRows }
  } catch (err) {
    console.error("SingleRemainHeatmap API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Single 유저 데이터
export async function fetchSingleUserDataSearchResultApi(clusterType: string, fields: string[]) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/single/user-data", {
      clusterType,
      fields,
    });
    return res.data; // { tableData: CohortSingleUserResponse[] }
  } catch (err) {
    console.error("SingleUserData API 요청 실패:", err);
    throw err;
  }
}

// MARK: - Double 시각화
export async function fetchDoubleVisualizationApi(firstClusterType: string, secondClusterType: string) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/double/visualization", {
      firstClusterType,
      secondClusterType,
    });
    return res.data; // { firstImageBase64A, firstImageBase64B, secondImageBase64A, secondImageBase64B }
  } catch (err) {
    console.error("DoubleVisualization API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Double 인사이트
export async function fetchDoubleInsightApi(firstClusterType: string, secondClusterType: string) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/double/insight", {
      firstClusterType,
      secondClusterType,
    });
    return res.data; // { firstContent, secondContent }
  } catch (err) {
    console.error("DoubleInsight API 요청 실패:", err);
    throw err;
  }
}

// MARK: - Double 히트맵
export async function fetchDoubleRemainHeatmapApi(firstClusterType: string, secondClusterType: string) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/double/remain-heatmap", {
      firstClusterType,
      secondClusterType,
    });
    return res.data; // { firstContent, firstColumnLabels, firstDataRows, secondContent, secondColumnLabels, secondDataRows }
  } catch (err) {
    console.error("DoubleRemainHeatmap API 요청 에러:", err);
    throw err;
  }
}

// MARK: - Double 유저 데이터
export async function fetchDoubleUserDataSearchResultApi(
  firstClusterType: string,
  secondClusterType: string,
  fields: string[]
) {
  try {
    const res = await axiosInstance.post("/analysis/cohort/double/user-data", {
      firstClusterType,
      secondClusterType,
      fields,
    });
    return res.data; // { firstTableData: CohortDoubleUserResponse[], secondTableData: CohortDoubleUserResponse[] }
  } catch (err) {
    console.error("DoubleUserData API 요청 실패:", err);
    throw err;
  }
}