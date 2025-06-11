// /presentation/components/organisms/SingleInsightPanel.tsx
import { Insight } from "@/core/model/CohortModels";
import { PanelTitle } from "../atoms/PanelTitle";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader";

interface Props {
  insight: Insight | null;
  isLoading: boolean;
  error: Error | null;
}

interface DetailedRecommendation {
  title: string;
  what: string;
  why: string;
  how: string;
}

function parseRecommendation(text: string): DetailedRecommendation | null {
  // 번호 붙은 상세 항목인지 확인 (ex: "1. **고객 유지 프로그램 강화**:")
  const titleMatch = text.match(/^\d+\. \*\*(.+)\*\*:/);
  if (!titleMatch) return null;

  const title = titleMatch[1];

  // 각각 “무엇을 해야 하나요?”, “왜 해야 하나요?”, “어떻게 하나요?” 부분 추출
  const whatMatch = text.match(/- \*\*무엇을 해야 하나요\?\*\*: (.+?)(?=\n|$)/);
  const whyMatch = text.match(/- \*\*왜 해야 하나요\?\*\*: (.+?)(?=\n|$)/);
  const howMatch = text.match(/- \*\*어떻게 하나요\?\*\*: (.+?)(?=\n|$)/);

  if (!whatMatch || !whyMatch || !howMatch) return null;

  return {
    title,
    what: whatMatch[1].trim(),
    why: whyMatch[1].trim(),
    how: howMatch[1].trim(),
  };
}

export function SingleInsightPanel({ insight, isLoading, error }: Props) {
  const noData = !isLoading && !error && !insight;

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트" className="text-xl font-bold mb-2" />

      {isLoading && <DotWaveLoader color="blue" />}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {noData && <p className="text-sm text-gray-400">도출된 인사이트가 없습니다.</p>}

      {!isLoading && !error && insight && (
        <div className="text-sm text-black space-y-3">
          <p className="font-semibold">요약:</p>
          <p className="whitespace-pre-line">{insight.summary}</p>

          <p className="font-semibold">예측:</p>
          <p className="whitespace-pre-line">{insight.prediction}</p>

          <p className="font-semibold mt-4">행동 추천:</p>
          <ul className="list-disc list-inside space-y-3">
            {insight.recommendations.map((rec, idx) => {
              const detail = parseRecommendation(rec);
              if (detail) {
                return (
                  <li key={idx} className="mb-3">
                    <strong className="font-bold">{detail.title}</strong>
                    <p><strong>무엇을 해야 하나요?</strong> {detail.what}</p>
                    <p><strong>왜 해야 하나요?</strong> {detail.why}</p>
                    <p><strong>어떻게 해야 하나요?</strong> {detail.how}</p>
                  </li>
                );
              }
              return <li key={idx}>{rec}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
