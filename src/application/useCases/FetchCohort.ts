// /application/useCases/FetchCohort.ts
import { CohortRepositoryImpl } from "@/infrastructure/repositories/CohortRepositoryImpl";

const repository = new CohortRepositoryImpl();

export async function fetchCohortBehaviorPattern() {
    return await repository.fetchBehaviorPattern();
}

export async function fetchCohortRemainHeatmap() {
    return await repository.fetchRemainHeatmap();
}

export async function fetchCohortInsight() {
    return await repository.fetchInsight();
}