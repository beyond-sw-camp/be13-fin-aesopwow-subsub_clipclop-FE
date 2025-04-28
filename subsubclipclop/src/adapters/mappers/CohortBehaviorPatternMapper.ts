// /adapters/mappers/CohortBehaviorPatternMapper.ts
import { CohortAnalysisBehaviorPatternResponseDto } from "@/core/cohort/CohortAnalysisBehaviorPatternResponseDto.ts";

/**
 * Maps a raw input object to a CohortAnalysisBehaviorPatternResponseDto.
 *
 * @param raw - The input object containing at least {@link raw.title} and {@link raw.content}.
 * @returns An object with {@link CohortAnalysisBehaviorPatternResponseDto.title} and {@link CohortAnalysisBehaviorPatternResponseDto.content} properties.
 */
export function CohortBehaviorPatternMapper(raw: any): CohortAnalysisBehaviorPatternResponseDto {
  return {
    title: raw.title,
    content: raw.content,
  };
}