import { CohortRepository } from "@/ports/repositories/CohortRepository.ts";
import { fetchBehaviorPatternApi, fetchRemainHeatmapApi, fetchInsightApi } from "@/infrastructure/api/cohortApi.ts";
import { CohortBehaviorPatternMapper } from "@/adapters/mappers/CohortBehaviorPatternMapper";
import { CohortRemainHeatmapMapper } from "@/adapters/mappers/CohortRemainHeatmapMapper";
import { CohortInsightMapper } from "@/adapters/mappers/CohortInsightMapper";

export class CohortRepositoryImpl implements CohortRepository {
  async fetchBehaviorPattern() {
    const rawData = await fetchBehaviorPatternApi();
    return CohortBehaviorPatternMapper(rawData); // ✅ 매퍼 사용
  }

  async fetchRemainHeatmap() {
    const rawData = await fetchRemainHeatmapApi();
    return CohortRemainHeatmapMapper(rawData); // ✅ 매퍼 사용
  }

  async fetchInsight() {
    const rawData = await fetchInsightApi();
    return CohortInsightMapper(rawData); // ✅ 매퍼 사용
  }
}
