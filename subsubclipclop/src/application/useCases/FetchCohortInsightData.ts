// /application/useCases/FetchCohortInsightData.ts
import { cohortGateway } from "@/adapters/gateways/CohortGateway";
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto";

export async function fetchCohortInsight(): Promise<CohortAnalysisInsightResponseDto> {
  return await cohortGateway.fetchInsight();
}
