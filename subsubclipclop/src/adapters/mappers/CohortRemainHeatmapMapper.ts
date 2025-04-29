// /adapters/mappers/CohortRemainHeatmapMapper.ts
import { CohortAnalysisRemainHitmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHitmapResponseDto";

export function CohortRemainHeatmapMapper(raw: any): CohortAnalysisRemainHitmapResponseDto {
  return {
    title: raw.title,
    content: raw.content,
    heatmapImageBase64: raw.heatmapImageBase64,
  };
}
