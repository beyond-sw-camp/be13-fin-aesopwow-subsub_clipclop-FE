// /application/useCases/FetchCohortRemainHeatmapData.ts
import { cohortGateway } from "@/adapters/gateways/CohortGateway";
import { CohortAnalysisRemainHitmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHitmapResponseDto";

/**
 * Retrieves cohort remain heatmap data from the gateway.
 *
 * @returns A promise that resolves to the cohort analysis remain heatmap response.
 */
export async function fetchCohortRemainHeatmap(): Promise<CohortAnalysisRemainHitmapResponseDto> {
  return await cohortGateway.fetchRemainHeatmap();
}