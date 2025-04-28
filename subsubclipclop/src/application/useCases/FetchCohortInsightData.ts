// /application/useCases/FetchCohortInsightData.ts
import { cohortGateway } from "@/adapters/gateways/CohortGateway";
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto";

/**
 * Retrieves cohort analysis insight data.
 *
 * @returns A promise that resolves to the cohort analysis insight response.
 */
export async function fetchCohortInsight(): Promise<CohortAnalysisInsightResponseDto> {
  return await cohortGateway.fetchInsight();
}
