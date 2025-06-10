// 📁 /presentation/components/organisms/DoubleVisualizationPanel.tsx
import { useState } from "react";
import { PanelTitle } from "../atoms/PanelTitle";
import { Chart } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"


interface DoubleVisualizationPanelProps {
  firstClusterType: string;
  secondClusterType: string;
  doughnutChartA: ChartData<"doughnut", number[]> | null;
  lineChartA: ChartData<"line", number[]> | null;
  doughnutChartB: ChartData<"doughnut", number[]> | null;
  lineChartB: ChartData<"line", number[]> | null;
  isLoading: boolean;
  error: Error | null;
}

export function DoubleVisualizationPanel({
  firstClusterType,
  secondClusterType,
  doughnutChartA,
  lineChartA,
  doughnutChartB,
  lineChartB,
  isLoading,
  error,
}: DoubleVisualizationPanelProps) {
  const [activeCluster, setActiveCluster] = useState<"A" | "B">("A");

  const getButtonStyle = (cluster: "A" | "B") =>
    `px-4 py-2 text-sm font-semibold transition rounded-lg ${activeCluster === cluster
      ? "bg-orange-400 text-black"
      : "bg-transparent text-black"
    }`;

  const doughnutChart = activeCluster === "A" ? doughnutChartA : doughnutChartB;
  const lineChart = activeCluster === "A" ? lineChartA : lineChartB;

  const noData = !isLoading && !error && !doughnutChart && !lineChart;

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full max-w-full overflow-hidden">
      <PanelTitle title="시각화 결과 (양측 비교)" className="text-xl font-bold mb-4" />

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={getButtonStyle("A")}
          onClick={() => setActiveCluster("A")}
        >
          {firstClusterType} 기반
        </button>
        <button
          className={getButtonStyle("B")}
          onClick={() => setActiveCluster("B")}
        >
          {secondClusterType} 기반
        </button>
      </div>

      {isLoading && <DotWaveLoader color="black" />}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {noData && <p className="text-sm text-gray-500">표시할 데이터가 없습니다.</p>}

      {!isLoading && !error && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {doughnutChart && (
            <div className="w-full h-[300px]">
              <Chart
                type="doughnut"
                data={doughnutChart}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          )}
          {lineChart && (
            <div className="w-full h-[300px]">
              <Chart
                type="line"
                data={lineChart}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
