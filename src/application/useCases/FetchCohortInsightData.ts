// /application/useCases/FetchCohortInsightData.ts
import { cohortGateway } from "@/adapters/gateways/CohortGateway.ts";
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto.ts";

export async function fetchCohortInsight(): Promise<CohortAnalysisInsightResponseDto> {
  return await cohortGateway.fetchInsight();
}
