// /adapters/mappers/CohortInsightMapper.ts
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto";

export function CohortInsightMapper(raw: any): CohortAnalysisInsightResponseDto {
  return {
    title: raw.title,
    content: raw.content,
  };
}
