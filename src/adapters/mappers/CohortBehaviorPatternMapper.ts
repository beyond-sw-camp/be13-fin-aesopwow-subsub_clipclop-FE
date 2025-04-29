// /adapters/mappers/CohortBehaviorPatternMapper.ts
import { CohortAnalysisBehaviorPatternResponseDto } from "@/core/cohort/CohortAnalysisBehaviorPatternResponseDto.ts";

export function CohortBehaviorPatternMapper(raw: any): CohortAnalysisBehaviorPatternResponseDto {
  return {
    title: raw.title,
    content: raw.content,
  };
}