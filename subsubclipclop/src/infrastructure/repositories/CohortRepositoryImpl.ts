// /infrastructure/repositories/CohortRepositoryImpl.ts

import { CohortRepository } from "@/ports/repositories/CohortRepository";
import { fetchCohortDataApi, fetchRetentionHeatmapApi } from "@/infrastructure/api/cohortApi";
import { CohortMapper } from "@/adapters/mappers/CohortMapper";
import { RetentionMapper } from "@/adapters/mappers/RetentionMapper";
import { Cohort } from "@/core/user/Cohort";
import { RetentionMatrix } from "@/core/user/RetentionMatrix";

export class CohortRepositoryImpl implements CohortRepository {
  async fetchCohorts(): Promise<Cohort[]> {
    const rawData = await fetchCohortDataApi();
    return rawData.map(CohortMapper);
  }

  async fetchRetentionMatrix(): Promise<RetentionMatrix> {
    const rawData = await fetchRetentionHeatmapApi();
    return RetentionMapper(rawData);
  }
}
