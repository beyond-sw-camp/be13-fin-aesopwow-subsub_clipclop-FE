// /application/useCases/FetchCohortRemainHeatmapData.ts
import { cohortGateway } from "@/adapters/gateways/CohortGateway.ts";
import { CohortAnalysisRemainHitmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHitmapResponseDto.ts";

export async function fetchCohortRemainHeatmap(): Promise<CohortAnalysisRemainHitmapResponseDto> {
  return await cohortGateway.fetchRemainHeatmap();
}