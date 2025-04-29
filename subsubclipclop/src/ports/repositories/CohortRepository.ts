// /ports/repositories/CohortRepository.ts
import { CohortAnalysisBehaviorPatternResponseDto } from "@/core/cohort/CohortAnalysisBehaviorPatternResponseDto.ts";
import { CohortAnalysisRemainHitmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHitmapResponseDto";
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto";

export interface CohortRepository {
  fetchBehaviorPattern(): Promise<CohortAnalysisBehaviorPatternResponseDto>;
  fetchRemainHeatmap(): Promise<CohortAnalysisRemainHitmapResponseDto>;
  fetchInsight(): Promise<CohortAnalysisInsightResponseDto>;
}