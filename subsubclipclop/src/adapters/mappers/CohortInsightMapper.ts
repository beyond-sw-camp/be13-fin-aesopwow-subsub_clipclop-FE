// /adapters/mappers/CohortInsightMapper.ts
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto";

/**
 * Maps a raw input object to a CohortAnalysisInsightResponseDto by extracting the title and content properties.
 *
 * @param raw - The input object containing at least title and content properties.
 * @returns An object with title and content suitable for CohortAnalysisInsightResponseDto.
 */
export function CohortInsightMapper(raw: any): CohortAnalysisInsightResponseDto {
  return {
    title: raw.title,
    content: raw.content,
  };
}
