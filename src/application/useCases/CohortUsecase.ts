// /src/application/useCases/CohortUsecase.ts
import { CohortRepository } from "@/infrastructure/repositories/CohortRepository";

import { CohortRequestDto, CohortFileInfo } from "@/core/model/CohortModels";

// 분석 요청
export class RequestCohortAnalysisUseCase {
  constructor(private readonly repository: CohortRepository) {}

  async execute(dto: CohortRequestDto): Promise<void> {
    await this.repository.requestCohort(dto);
  }
}

// 분석 리스트
export class GetCohortHistoryUseCase {
  constructor(private readonly repository: CohortRepository) {}

  async execute(infoDbNo: number, analysisNo: number): Promise<CohortFileInfo[]> {
    return await this.repository.getCohortHistory(infoDbNo, analysisNo);
  }
}

// 분석 결과
export class GetCohortResultCsvUseCase {
  constructor(private readonly repository: CohortRepository) {}

  async execute(infoDbNo: number, analysisNo: number, filename: string): Promise<string> {
    return await this.repository.fetch(infoDbNo, analysisNo, filename);
  }
}