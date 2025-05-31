// ✅ 수정된 SingleVisualizationPanel.tsx (Chart 크기 문제 해결)

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
    <div className="p-6 bg-white rounded-xl shadow w-full max-w-full overflow-hidden">
      <PanelTitle title="시각화 결과" className="text-xl font-bold mb-2" />

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
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
