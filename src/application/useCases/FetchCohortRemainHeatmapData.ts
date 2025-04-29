// /application/useCases/FetchCohortRemainHeatmapData.ts
import { cohortGateway } from "@/adapters/gateways/CohortGateway";
import { CohortAnalysisRemainHitmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHitmapResponseDto";

export async function fetchCohortRemainHeatmap(): Promise<CohortAnalysisRemainHitmapResponseDto> {
  return await cohortGateway.fetchRemainHeatmap();
}