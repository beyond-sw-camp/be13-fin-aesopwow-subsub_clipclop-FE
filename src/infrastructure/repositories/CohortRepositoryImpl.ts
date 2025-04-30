import { CohortRepository } from "@/ports/repositories/CohortRepository.ts";
import {
  fetchBehaviorPatternApi,
  fetchInsightApi,
  fetchRemainHeatmapApi
} from "@/infrastructure/api/cohortApi.ts";
import { CohortBehaviorPatternMapper } from "@/adapters/mappers/CohortBehaviorPatternMapper";
import { CohortInsightMapper } from "@/adapters/mappers/CohortInsightMapper";
import { CohortRemainHeatmapMapper } from "@/adapters/mappers/CohortRemainHeatmapMapper";

import { getUser } from "@/core/user/UserStore";
import { CohortAnalysisBehaviorPatternRequestDto } from "@/core/cohort/CohortAnalysisBehaviorPatternRequestDto";
import { CohortAnalysisInsightRequestDto } from "@/core/cohort/CohortAnalysisInsightRequestDto";
import { CohortAnalysisRemainHeatmapRequestDto } from "@/core/cohort/CohortAnalysisRemainHeatmapRequestDto.ts";

export class CohortRepositoryImpl implements CohortRepository {
  async fetchBehaviorPattern() {
    const user = getUser();
    const dto: CohortAnalysisBehaviorPatternRequestDto = {
      companyNo: user.companyNo,
    };
    const rawData = await fetchBehaviorPatternApi(dto);
    return CohortBehaviorPatternMapper(rawData);
  }

  async fetchInsight() {
    const user = getUser();
    const dto: CohortAnalysisInsightRequestDto = {
      companyNo: user.companyNo,
    };
    const rawData = await fetchInsightApi(dto);
    return CohortInsightMapper(rawData);
  }

  async fetchRemainHeatmap() {
    const user = getUser();
    const dto: CohortAnalysisRemainHeatmapRequestDto = {
      companyNo: user.companyNo,
    };
    const rawData = await fetchRemainHeatmapApi(dto);
    return CohortRemainHeatmapMapper(rawData);
  }
}
