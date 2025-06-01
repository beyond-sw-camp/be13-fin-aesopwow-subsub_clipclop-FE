// 📁 /src/application/viewModels/ShapViewModel.ts
import { useEffect, useState } from "react";
import {
  fetchEntireShapAnalysis,
  fetchFilteredShapAnalysis,
} from "@/application/useCases/ShapUsecase";
import { ShapResult } from "@/infrastructure/repositories/ShapRepository";

export function useShapEntireViewModel() {
  const [result, setResult] = useState<ShapResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);

        // ✅ 실제 서버 요청
        const data = await fetchEntireShapAnalysis();
        setResult(data);

        // 🔽 더미 데이터 (테스트용)
        // const dummy: ShapResult = {
        //   shapDotChart: generateDummyDotChart("전체"),
        //   barChart: generateDummyBarChart("전체"),
        //   summary: {
        //     positive: "매우 긍정적",
        //     특징: "전체 사용자 중 충성 고객 비율이 높음",
        //     패턴: "재방문과 장기 사용 경향",
        //     추천액션: "충성 고객 대상 리워드 제공",
        //   },
        // };
        // setResult(dummy);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("SHAP 전체 분석 실패"));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return {
    shapDotChart: result?.shapDotChart ?? [],
    barChart: result?.barChart ?? [],
    summary: result?.summary ?? null,
    isLoading,
    error,
  };
}

export function useShapFilteredViewModel(
  keyword: string,
  filters: Record<string, any>
) {
  const [result, setResult] = useState<ShapResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);

        // ✅ 실제 서버 요청
        const data = await fetchFilteredShapAnalysis(keyword, filters);
        setResult(data);

        // 🔽 더미 데이터 (테스트용)
        // const dummy: ShapResult = {
        //   shapDotChart: generateDummyDotChart("필터"),
        //   barChart: generateDummyBarChart("필터"),
        //   summary: {
        //     positive: "중립",
        //     특징: "특정 조건 사용자 행동 예측 가능",
        //     패턴: "단기 이용 후 이탈 경향",
        //     추천액션: "정착 유도형 콘텐츠 추천",
        //   },
        // };
        // setResult(dummy);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("SHAP 필터 분석 실패"));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [keyword, JSON.stringify(filters)]);

  return {
    shapDotChart: result?.shapDotChart ?? [],
    barChart: result?.barChart ?? [],
    summary: result?.summary ?? null,
    isLoading,
    error,
  };
}
