// /ports/repositories/CohortRepository.ts
import { CohortAnalysisBehaviorPatternResponseDto } from "@/core/cohort/CohortAnalysisBehaviorPatternResponseDto.ts";
import { CohortAnalysisRemainHeatmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHeatmapResponseDto.ts";
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto";

export interface CohortRepository {
  fetchBehaviorPattern(): Promise<CohortAnalysisBehaviorPatternResponseDto>;
  fetchRemainHeatmap(): Promise<CohortAnalysisRemainHeatmapResponseDto>;
  fetchInsight(): Promise<CohortAnalysisInsightResponseDto>;
}