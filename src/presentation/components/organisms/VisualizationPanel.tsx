// /presentation/components/organisms/VisualizationPanel.tsx

import { useCohortVisualizationViewModel } from "@/application/viewModels/CohortViewModel";
import { PanelTitle } from "../atoms/PanelTitle";

interface VisualizationPanelProps {
  clusterType: string;
}

export function VisualizationPanel({ clusterType }: VisualizationPanelProps) {
  const { data, loading, error } = useCohortVisualizationViewModel(clusterType);

  return (
    <div className="p-6 bg-white rounded-xl shadow h-full min-h-[200px]">
      <PanelTitle title="시각화 결과" className="text-xl font-bold mb-2" />

      {loading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {data && (
        <div className="mt-4 flex space-x-4">
          <img
            src={data.visualizationImage1Base64}
            alt="시각화 이미지 1"
            className="w-1/2 h-auto rounded-md"
          />
          <img
            src={data.visualizationImage2Base64}
            alt="시각화 이미지 2"
            className="w-1/2 h-auto rounded-md"
          />
        </div>
      )}
    </div>
  );
}