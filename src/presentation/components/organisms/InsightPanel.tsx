// /presentation/components/organisms/InsightPanel.tsx

import { useCohortInsightViewModel } from "@/application/viewModels/CohortViewModel";
import { PanelTitle } from "../atoms/PanelTitle";

interface InsightPanelProps {
  clusterType: string;
}

export function InsightPanel({ clusterType }: InsightPanelProps) {
  const { data, loading, error } = useCohortInsightViewModel(clusterType);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트" className="text-xl font-bold mb-2" />
      {loading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {data && (
        <p className="text-sm text-gray-500">{data.content}</p>
      )}
    </div>
  );
}