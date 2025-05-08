// /infrastructure/repositories/CohortRepository.ts
import {
  fetchBehaviorPatternApi,
  fetchInsightApi,
  fetchRemainHeatmapApi,
} from "@/infrastructure/api/CohortApi.ts";

import { getUser } from "@/application/stores/UserStore.ts";
import {
  CohortBehaviorPatternResponse,
  CohortInsightResponse,
  CohortHeatmapResponse,
} from "@/core/model/CohortModel";

export class CohortRepository {
  // MARK: - 행동 패턴 조회
  async fetchBehaviorPattern(): Promise<CohortBehaviorPatternResponse> {
    const { companyNo } = getUser();
    const rawData = await fetchBehaviorPatternApi(companyNo);
    return {
      title: rawData.title,
      content: rawData.content,
    };
  }

  // MARK: - 인사이트 조회
  async fetchInsight(): Promise<CohortInsightResponse> {
    const { companyNo } = getUser();
    const rawData = await fetchInsightApi(companyNo);
    return {
      title: rawData.title,
      content: rawData.content,
    };
  }

  // MARK: - 잔존율 히트맵 조회
  async fetchRemainHeatmap(): Promise<CohortHeatmapResponse> {
    const { companyNo } = getUser();
    const rawData = await fetchRemainHeatmapApi(companyNo);
    return {
      title: rawData.title,
      content: rawData.content,
      heatmapImageBase64: rawData.heatmapImageBase64,
    };
  }
}