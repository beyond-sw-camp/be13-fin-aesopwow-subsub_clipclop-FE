// /application/useCases/FetchCohortBehaviorPatternData.ts
import { cohortGateway } from "@/adapters/gateways/CohortGateway.ts";
import { CohortAnalysisBehaviorPatternResponseDto } from "@/core/cohort/CohortAnalysisBehaviorPatternResponseDto.ts";

export async function fetchCohortBehaviorPattern(): Promise<CohortAnalysisBehaviorPatternResponseDto> {
  return await cohortGateway.fetchBehaviorPattern();
}
