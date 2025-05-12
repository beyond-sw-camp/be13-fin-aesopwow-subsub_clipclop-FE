import { useState } from "react";
import { useCohortDoubleVisualizationViewModel } from "@/application/viewModels/CohortViewModel";
import { PanelTitle } from "../atoms/PanelTitle";

interface DoubleVisualizationPanelProps {
  firstClusterType: string;
  secondClusterType: string;
}

export function DoubleVisualizationPanel({ firstClusterType, secondClusterType }: DoubleVisualizationPanelProps) {
  const { data, isLoading, error } = useCohortDoubleVisualizationViewModel(firstClusterType, secondClusterType);
  const [activeCluster, setActiveCluster] = useState<'A' | 'B'>('A');

  const getButtonStyle = (cluster: 'A' | 'B') =>
    `px-4 py-2 text-sm font-semibold transition rounded-lg ${
      activeCluster === cluster ? 'bg-orange-400 text-black' : 'bg-transparent text-black'
    }`;

  return (
    <div className="p-6 bg-white rounded-xl shadow h-full min-h-[200px]">
      <PanelTitle title="시각화 결과 (양측 비교)" className="text-xl font-bold mb-4" />

      {/* 버튼 영역 */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={getButtonStyle('A')}
          onClick={() => setActiveCluster('A')}
        >
          {firstClusterType} 기반
        </button>
        <button
          className={getButtonStyle('B')}
          onClick={() => setActiveCluster('B')}
        >
          {secondClusterType} 기반
        </button>
      </div>

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}

      {data && (
        <div className="flex gap-4">
          {activeCluster === 'A' && (
            <>
              <img
                src={data.firstImageBase64A}
                alt="군집 A - 이미지 A"
                className="w-1/2 h-auto rounded-md"
              />
              <img
                src={data.firstImageBase64B}
                alt="군집 A - 이미지 B"
                className="w-1/2 h-auto rounded-md"
              />
            </>
          )}
          {activeCluster === 'B' && (
            <>
              <img
                src={data.secondImageBase64A}
                alt="군집 B - 이미지 A"
                className="w-1/2 h-auto rounded-md"
              />
              <img
                src={data.secondImageBase64B}
                alt="군집 B - 이미지 B"
                className="w-1/2 h-auto rounded-md"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
