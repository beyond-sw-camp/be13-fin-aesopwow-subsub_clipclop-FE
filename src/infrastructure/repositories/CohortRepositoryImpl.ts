// /infrastructure/repositories/CohortRepositoryImpl.ts
import {
  fetchBehaviorPatternApi,
  fetchInsightApi,
  fetchRemainHeatmapApi,
} from "@/infrastructure/api/cohortApi.ts";

import { getUser } from "@/core/user/UserStore";

export class CohortRepositoryImpl {
  async fetchBehaviorPattern() {
    const { companyNo } = getUser();
    const rawData = await fetchBehaviorPatternApi(companyNo);
    return {
      title: rawData.title,
      content: rawData.content,
    };
  }

  async fetchInsight() {
    const { companyNo } = getUser();
    const rawData = await fetchInsightApi(companyNo);
    return {
      title: rawData.title,
      content: rawData.content,
    };
  }

  async fetchRemainHeatmap() {
    const { companyNo } = getUser();
    const rawData = await fetchRemainHeatmapApi(companyNo);
    return {
      title: rawData.title,
      content: rawData.content,
      heatmapImageBase64: rawData.heatmapImageBase64,
    };
  }
}
