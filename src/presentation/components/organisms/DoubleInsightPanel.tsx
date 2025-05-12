import { useCohortDoubleInsightViewModel } from "@/application/viewModels/CohortViewModel";
import { PanelTitle } from "../atoms/PanelTitle";

interface DoubleInsightPanelProps {
  firstClusterType: string;
  secondClusterType: string;
}

export function DoubleInsightPanel({ firstClusterType, secondClusterType }: DoubleInsightPanelProps) {
  const { data, isLoading, error } = useCohortDoubleInsightViewModel(firstClusterType, secondClusterType);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트 (양측 비교)" className="text-xl font-bold mb-2" />

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}

      {data && (
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>A:</strong> {data.firstContent}</p>
          <p><strong>B:</strong> {data.secondContent}</p>
        </div>
      )}
    </div>
  );
}
