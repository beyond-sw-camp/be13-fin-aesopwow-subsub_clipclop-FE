// 📁 /src/infrastructure/api/shapApi.ts
import axiosInstance from "@/infrastructure/api/Axios";
import { getUser } from "@/application/stores/UserStore";

/**
 * 📌 전체 유저 대상 SHAP 분석 요청
 * @returns CSV 텍스트
 */
export async function fetchEntireShapCsvApi(): Promise<string> {
  const { infoDbNo, originTable } = getUser();

  if (!infoDbNo || !originTable) {
    throw new Error("필수 파라미터 누락 (infoDbNo, originTable)");
  }

  const response = await axiosInstance.get(`/analysis/shap`, {
    params: { infoDbNo, originTable },
    responseType: "blob",
  });

  return await response.data.text();
}

/**
 * 📌 필터 기반 SHAP 분석 요청
 * @param keyword 키워드 (","로 join된 문자열)
 * @param filters JSON 형태의 필터 조건 (e.g. { subscription: ["Premium"], genre: ["Action"] })
 * @returns CSV 텍스트
 */
export async function fetchFilteredShapCsvApi(
  keyword: string,
  filters: Record<string, any>
): Promise<string> {
  const { infoDbNo, originTable } = getUser();

  if (!infoDbNo || !originTable) {
    throw new Error("필수 파라미터 누락 (infoDbNo, originTable)");
  }

  const response = await axiosInstance.post(`/analysis/shap`, filters, {
    params: { infoDbNo, originTable, keyword },
    responseType: "blob",
  });

  return await response.data.text();
}
