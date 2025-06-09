// /presentation/components/organisms/SingleInsightPanel.tsx
import { Insight } from "@/core/model/CohortModels";
import { PanelTitle } from "../atoms/PanelTitle";

interface Props {
  insight: Insight | null;
  isLoading: boolean;
  error: Error | null;
}

export function SingleInsightPanel({ insight, isLoading, error }: Props) {
  const noData = !isLoading && !error && !insight;

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트" className="text-xl font-bold mb-2" />

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {noData && <p className="text-sm text-gray-400">도출된 인사이트가 없습니다.</p>}

      {!isLoading && !error && insight && (
        <div className="text-sm text-black space-y-3">
          <p className="font-semibold">요약:</p>
          <p className="whitespace-pre-line">{insight.summary}</p>

          <p className="font-semibold mt-4">행동 추천:</p>
          <ul className="list-disc list-inside space-y-1">
            {insight.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}