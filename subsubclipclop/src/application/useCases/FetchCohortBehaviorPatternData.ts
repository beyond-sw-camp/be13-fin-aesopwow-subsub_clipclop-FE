// /application/useCases/FetchCohortBehaviorPatternData.ts
import { cohortGateway } from "@/adapters/gateways/CohortGateway";
import { CohortAnalysisBehaviorPatternResponseDto } from "@/core/cohort/CohortAnalysisBehaviorPatternResponseDto.ts";

/**
 * Retrieves cohort behavior pattern data from the gateway.
 *
 * @returns A promise that resolves to the cohort analysis behavior pattern response.
 */
export async function fetchCohortBehaviorPattern(): Promise<CohortAnalysisBehaviorPatternResponseDto> {
  return await cohortGateway.fetchBehaviorPattern();
}
