// /application/useCases/FetchCohortRemainHeatmapData.ts
import { CohortRepositoryImpl } from "@/infrastructure/repositories/CohortRepositoryImpl";

const repository = new CohortRepositoryImpl();

export async function fetchCohortRemainHeatmap() {
  return await repository.fetchRemainHeatmap();
}
