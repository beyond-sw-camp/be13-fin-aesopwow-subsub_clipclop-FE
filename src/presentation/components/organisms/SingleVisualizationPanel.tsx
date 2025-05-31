// 📁 /presentation/components/organisms/SingleVisualizationPanel.tsx
import { PanelTitle } from "../atoms/PanelTitle";
import { Chart } from "react-chartjs-2";
import type { ChartData } from "chart.js";

interface Props {
  doughnutChart: ChartData<"doughnut", number[]> | null;
  lineChart: ChartData<"line", number[]> | null;
  isLoading: boolean;
  error: Error | null;
}

export function SingleVisualizationPanel({ doughnutChart, lineChart, isLoading, error }: Props) {
  const noData = !isLoading && !error && !doughnutChart && !lineChart;

  return (
    <div className="p-6 bg-white rounded-xl shadow h-full min-h-[200px]">
      <PanelTitle title="시각화 결과" className="text-xl font-bold mb-2" />

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {noData && <p className="text-sm text-gray-500">표시할 데이터가 없습니다.</p>}

      {!isLoading && !error && (
        <div className="mt-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {doughnutChart && (
            <div className="w-full md:w-1/2">
              <Chart type="doughnut" data={doughnutChart} />
            </div>
          )}
          {lineChart && (
            <div className="w-full md:w-1/2">
              <Chart type="line" data={lineChart} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
