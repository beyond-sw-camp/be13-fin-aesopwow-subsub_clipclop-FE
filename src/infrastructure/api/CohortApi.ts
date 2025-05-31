// 📁 /src/infrastructure/api/CohortApi.ts
import axiosInstance from "@/infrastructure/api/Axios";
import { getUser } from "@/application/stores/UserStore";

/**
 * 📌 Cohort 분석 결과 요청 (Single & Double 겸용)
 * @param options - 단일 또는 이중 분석 파라미터
 *   - clusterType: string (단일 분석)
 *   - firstClusterType & secondClusterType: string (이중 분석)
 * @returns CSV 텍스트
 */
export async function fetchCohortCsvApi(
  options:
    | { clusterType: string }
    | { firstClusterType: string; secondClusterType: string }
): Promise<string> {
  const { infoDbNo, originTable } = getUser();

  // 파라미터 공통 체크
  if (!infoDbNo || !originTable) {
    throw new Error("필수 파라미터 누락 (infoDbNo, originTable)");
  }

  // 📌 단일 Cohort 분석
  if ("clusterType" in options) {
    const { clusterType } = options;
    if (!clusterType) {
      throw new Error("단일 분석: clusterType 누락");
    }

    const response = await axiosInstance.get(`/analysis`, {
      params: { infoDbNo, originTable, clusterType },
      responseType: "blob",
    });

    return await response.data.text();
  }

  // 📌 이중 Cohort 분석
  const { firstClusterType, secondClusterType } = options;
  if (!firstClusterType || !secondClusterType) {
    throw new Error("이중 분석: firstClusterType 또는 secondClusterType 누락");
  }

  const response = await axiosInstance.get(`/analysis`, {
    params: { infoDbNo, originTable, firstClusterType, secondClusterType },
    responseType: "blob",
  });

  return await response.data.text();
}
