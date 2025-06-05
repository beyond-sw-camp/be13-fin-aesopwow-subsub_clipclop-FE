// 📁 /src/infrastructure/api/CohortApi.ts
import axiosInstance from "@/infrastructure/api/Axios";
import { CohortRequestDto, CohortFileInfo } from "@/core/model/CohortModels";

// 분석 요청
export const postCohortAnalysis = async (dto: CohortRequestDto): Promise<void> => {
  await axiosInstance.post("/analysis/cohort", dto);
};

// 분석 리스트
export const getCohortFileList = async (
  infoDbNo: number,
  analysisNo: number
): Promise<CohortFileInfo[]> => {
  const response = await axiosInstance.get("/analysis/cohort/list", {
    params: { infoDbNo, analysisNo },
  });
  return response.data;
};

// 분석 결과
export const getCohortResultCsv = async ({
  infoDbNo,
  analysisNo,
  filename,
}: {
  infoDbNo: number;
  analysisNo: number;
  filename: string;
}): Promise<string> => {
  const response = await axiosInstance.get("/analysis/cohort", {
    params: { infoDbNo, analysisNo, filename },
    responseType: "text",
  });

  return response.data; // CSV 문자열
};