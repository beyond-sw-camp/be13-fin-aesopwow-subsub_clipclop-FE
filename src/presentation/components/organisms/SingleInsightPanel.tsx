// /presentation/components/organisms/SingleInsightPanel.tsx
import { useCohortSingleInsightViewModel } from "@/application/viewModels/CohortViewModel";
import { PanelTitle } from "../atoms/PanelTitle";

interface SingleInsightPanelProps {
  clusterType: string;
}

export function SingleInsightPanel({ clusterType }: SingleInsightPanelProps) {
  const { data, isLoading, error } = useCohortSingleInsightViewModel(clusterType);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트" className="text-xl font-bold mb-2" />
      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}

      {data && (
        <p className="text-sm text-gray-500">{data.content}</p>
      )}
    </div>
  );
}