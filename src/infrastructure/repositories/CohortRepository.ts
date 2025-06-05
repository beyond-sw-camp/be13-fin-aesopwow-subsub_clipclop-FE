import { postCohortAnalysis, getCohortFileList, getCohortResultCsv } from "../api/CohortApi";
import { CohortRequestDto, CohortFileInfo } from "@/core/model/CohortModels";

export class CohortRepository {
  // 분석 요청
  async requestCohort(dto: CohortRequestDto): Promise<void> {
    await postCohortAnalysis(dto);
  }

  // 분석 리스트
  async getCohortHistory(infoDbNo: number, analysisNo: number): Promise<CohortFileInfo[]> {
    return await getCohortFileList(infoDbNo, analysisNo);
  }

  // 분석 결과
  async fetch(infoDbNo: number, analysisNo: number, filename: string): Promise<string> {
    return await getCohortResultCsv({ infoDbNo, analysisNo, filename });
  }
}
