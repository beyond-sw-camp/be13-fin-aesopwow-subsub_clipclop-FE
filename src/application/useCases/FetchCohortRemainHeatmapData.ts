// /application/useCases/FetchCohortRemainHeatmapData.ts
import { cohortGateway } from "@/adapters/gateways/CohortGateway";
import { CohortAnalysisRemainHeatmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHeatmapResponseDto.ts";

export async function fetchCohortRemainHeatmap(): Promise<CohortAnalysisRemainHeatmapResponseDto> {
  return await cohortGateway.fetchRemainHeatmap();
}