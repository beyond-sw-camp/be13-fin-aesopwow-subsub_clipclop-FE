// /presentation/components/organisms/SingleVisualizationPanel.tsx
import { useCohortSingleVisualizationViewModel } from "@/application/viewModels/CohortViewModel";
import { PanelTitle } from "../atoms/PanelTitle";

interface SingleVisualizationPanelProps {
  clusterType: string;
}

export function SingleVisualizationPanel({ clusterType }: SingleVisualizationPanelProps) {
  const { data, isLoading, error } = useCohortSingleVisualizationViewModel(clusterType);

  return (
    <div className="p-6 bg-white rounded-xl shadow h-full min-h-[200px]">
      <PanelTitle title="시각화 결과" className="text-xl font-bold mb-2" />

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}

      {data && (
        <div className="mt-4 flex space-x-4">
          <img
            src={data.imageBase64A}
            alt="시각화 이미지 1"
            className="w-1/2 h-auto rounded-md"
          />
          <img
            src={data.imageBase64B}
            alt="시각화 이미지 2"
            className="w-1/2 h-auto rounded-md"
          />
        </div>
      )}
    </div>
  );
}