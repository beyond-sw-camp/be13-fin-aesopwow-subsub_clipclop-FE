// SingleVisualizationPanel.tsx
import { useState, useEffect } from "react";
import { PanelTitle } from "../atoms/PanelTitle";
import { Chart } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"


interface Props {
  doughnutChart: ChartData<"doughnut", number[]> | null;
  lineChart: ChartData<"line", number[]> | null;
  isLoading: boolean;
  error: Error | null;
  groupData: Record<string, number[]>;
}

export function SingleVisualizationPanel({
  doughnutChart,
  lineChart,
  isLoading,
  error,
  groupData,
}: Props) {
  const groupLabels = Object.keys(groupData);
  const [selectedGroup, setSelectedGroup] = useState("");

  // groupData가 갱신되면 selectedGroup 초기화
  useEffect(() => {
    if (groupLabels.length > 0 && !selectedGroup) {
      setSelectedGroup(groupLabels[0]);
    }
  }, [groupLabels, selectedGroup]);

  const currentValue = groupData[selectedGroup]?.[5];
  const safeCurrentValue = typeof currentValue === "number" ? currentValue : 0;

  const dynamicDoughnut: ChartData<"doughnut", number[]> = {
    labels: ["잔존", "이탈"],
    datasets: [
      {
        data: [safeCurrentValue, 100 - safeCurrentValue],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const noData = !isLoading && !error && !doughnutChart && !lineChart;

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full max-w-full overflow-hidden">
      <PanelTitle title="시각화 결과" className="text-xl font-bold mb-2" />

      {isLoading && <DotWaveLoader color="black" />}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {noData && <p className="text-sm text-gray-500">표시할 데이터가 없습니다.</p>}

      {!isLoading && !error && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* 도넛 차트 컨테이너 */}
          <div className="w-full h-[350px] flex flex-col justify-start">
            <div className="mb-2">
              <label className="text-sm font-semibold mr-2">그룹 선택:</label>
              <select
                className="border rounded px-2 py-1 text-sm"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                {groupLabels.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* 도넛 차트 영역 */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-[250px] h-[250px]">
                <Chart
                  type="doughnut"
                  data={dynamicDoughnut}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>

          {/* 꺾은선 그래프 */}
          {lineChart && (
            <div className="w-full h-[350px]">
              <Chart
                type="line"
                data={lineChart}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}