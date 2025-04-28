// /adapters/mappers/CohortRemainHeatmapMapper.ts
import { CohortAnalysisRemainHitmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHitmapResponseDto";

/**
 * Maps a raw input object to a {@link CohortAnalysisRemainHitmapResponseDto}.
 *
 * @param raw - The input object containing cohort heatmap data.
 * @returns An object with the properties {@link title}, {@link content}, and {@link heatmapImageBase64} extracted from {@link raw}.
 */
export function CohortRemainHeatmapMapper(raw: any): CohortAnalysisRemainHitmapResponseDto {
  return {
    title: raw.title,
    content: raw.content,
    heatmapImageBase64: raw.heatmapImageBase64,
  };
}
