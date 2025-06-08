// /presentation/components/organisms/SingleInsightPanel.tsx
import { PanelTitle } from "../atoms/PanelTitle";

interface Props {
  insight: string;
  isLoading: boolean;
  error: Error | null;
}

export function SingleInsightPanel({ insight, isLoading, error }: Props) {
  const noData = !isLoading && !error && insight.trim() === "";

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트" className="text-xl font-bold mb-2" />

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {noData && <p className="text-sm text-gray-400">도출된 인사이트가 없습니다.</p>}
      {!isLoading && !error && insight.trim() !== "" && (
        <p className="text-sm text-black whitespace-pre-line">{insight}</p>
      )}
    </div>
  );
}
