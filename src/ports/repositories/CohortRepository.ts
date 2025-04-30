// /ports/repositories/CohortRepository.ts
import { CohortAnalysisBehaviorPatternResponseDto } from "@/core/cohort/CohortAnalysisBehaviorPatternResponseDto.ts";
import { CohortAnalysisRemainHitmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHitmapResponseDto.ts";
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto.ts";

export interface CohortRepository {
  fetchBehaviorPattern(): Promise<CohortAnalysisBehaviorPatternResponseDto>;
  fetchRemainHeatmap(): Promise<CohortAnalysisRemainHitmapResponseDto>;
  fetchInsight(): Promise<CohortAnalysisInsightResponseDto>;
}