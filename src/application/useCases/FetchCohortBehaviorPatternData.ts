// /application/useCases/FetchCohortBehaviorPatternData.ts
import { CohortRepositoryImpl } from "@/infrastructure/repositories/CohortRepositoryImpl";

const repository = new CohortRepositoryImpl();

export async function fetchCohortBehaviorPattern() {
  return await repository.fetchBehaviorPattern();
}
