// /presentation/components/organisms/BehaviorPatternPanel.tsx

import { PanelTitle } from "../atoms/PanelTitle";
import { useCohortVisualizationViewModel } from "@/application/viewModels/CohortViewModel";

interface VisualizationPanelProps {
  clusterType: string;
}

export function VisualizationPanel({ clusterType }: VisualizationPanelProps) {
  const { data, loading, error } = useCohortVisualizationViewModel(clusterType);

  return (
    <div className="p-6 bg-white rounded-xl shadow h-full min-h-[200px]">
      <h2 className="text-xl font-bold mb-2">시각화 결과</h2>

      {loading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {data && (
        <>
          <PanelTitle title={data.title} />
          <div className="mt-4 space-y-4">
            <img
              src={data.visualizationImage1Base64}
              alt="시각화 이미지 1"
              className="w-full h-auto rounded-md"
            />
            <img
              src={data.visualizationImage2Base64}
              alt="시각화 이미지 2"
              className="w-full h-auto rounded-md"
            />
          </div>
        </>
      )}
    </div>
  );
}