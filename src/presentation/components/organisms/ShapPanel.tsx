// 📁 /presentation/components/organisms/ShapPanel.tsx
import { Chart } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import { useState } from "react";
import { ShapResultSummaryModal } from "./ShapResultSummaryModal";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"


import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
  Title
);

interface Summary {
  positive: string;
  특징: string;
  패턴: string;
  추천액션: string;
}

interface Props {
  dotChart: ChartData<"scatter", { x: number; y: number }[]>;
  barChart: ChartData<"bar", number[]>;
  isLoading: boolean;
  error: Error | null;
  mode: "entire" | "user";
  summary: Summary | null; // ✅ summary props 추가
}

export function ShapPanel({
  dotChart,
  barChart,
  isLoading,
  error,
  mode,
  summary,
}: Props) {
  const [open, setOpen] = useState(false);

  const noData = !isLoading && !error && dotChart?.datasets.length === 0;

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full max-w-full overflow-hidden">
      <div className="text-xl font-bold mb-4">SHAP 분석 결과</div>

      {isLoading && <DotWaveLoader color="black" />}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {noData && <p className="text-sm text-gray-500">표시할 데이터가 없습니다.</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-gray-50 rounded-xl p-4 shadow h-[420px]">
            <p className="text-sm text-gray-500 mb-2 font-medium">SHAP 분석 차트</p>
            <Chart
              type="scatter"
              data={dotChart}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: { display: true, text: "SHAP value" },
                  },
                  y: {
                    title: { display: true, text: "Feature" },
                  },
                },
              }}
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-4 shadow h-[420px]">
            <p className="text-sm text-gray-500 mb-2 font-medium">SHAP 분석 막대 그래프</p>
            <Chart
              type="bar"
              data={barChart}
              options={{
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: { display: true, text: "SHAP Value" },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      <div className="text-right mt-6">
        <button
          className="px-6 py-2 bg-orange-400 text-white rounded shadow hover:bg-orange-500"
          onClick={() => setOpen(true)}
        >
          결과 확인
        </button>
      </div>

      {open && summary && (
        <ShapResultSummaryModal open={open} onClose={() => setOpen(false)} mode={mode} summary={summary} />
      )}
    </div>
  );
}
