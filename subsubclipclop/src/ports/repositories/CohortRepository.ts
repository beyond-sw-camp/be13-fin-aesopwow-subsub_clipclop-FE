// /ports/repositories/CohortRepository.ts

import { Cohort } from "@/core/user/Cohort";
import { RetentionMatrix } from "@/core/user/RetentionMatrix";

export interface CohortRepository {
  fetchCohorts(): Promise<Cohort[]>;
  fetchRetentionMatrix(): Promise<RetentionMatrix>;
}
