// /adapters/mappers/CohortRemainHeatmapMapper.ts
import { CohortAnalysisRemainHeatmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHeatmapResponseDto.ts";

export function CohortRemainHeatmapMapper(raw: any): CohortAnalysisRemainHeatmapResponseDto {
  return {
    title: raw.title,
    content: raw.content,
    heatmapImageBase64: raw.heatmapImageBase64,
  };
}
