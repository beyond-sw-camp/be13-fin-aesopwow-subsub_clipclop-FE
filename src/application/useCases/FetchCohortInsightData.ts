// /application/useCases/FetchCohortInsightData.ts
import { CohortRepositoryImpl } from "@/infrastructure/repositories/CohortRepositoryImpl";

const repository = new CohortRepositoryImpl();

export async function fetchCohortInsight() {
  return await repository.fetchInsight();
}
