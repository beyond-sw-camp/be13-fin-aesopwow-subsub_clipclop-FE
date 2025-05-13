// /presentation/components/organisms/SingleVisualizationPanel.tsx
import { useEffect, useState, useRef, useMemo } from "react";
import { useAnalysisFileViewModel } from "@/application/viewModels/AnalysisViewModel";
import { getUser } from "@/application/stores/UserStore";
import { PanelTitle } from "../atoms/PanelTitle";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Chart.js 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SingleVisualizationPanelProps {
  clusterType: string;
}

export function SingleVisualizationPanel({ clusterType }: SingleVisualizationPanelProps) {
  // ✅ getUser 호출 고정
  const { companyNo } = useMemo(() => getUser(), []);

  // ✅ params 고정
  const params = useMemo(() => ({ clusterType, companyNo }), [clusterType, companyNo]);
  const { data, error, isLoading } = useAnalysisFileViewModel(params);

  const [chartData, setChartData] = useState<any>(null);
  const parsedRef = useRef(false);

  useEffect(() => {
    if (!data || parsedRef.current) return;
    parsedRef.current = true;

    data.text().then((text) => {
      const [headerLine, ...rows] = text.trim().split("\n");
      const headers = headerLine.split(",").slice(1);
      const datasets = rows.map((line) => {
        const parts = line.split(",");
        return {
          label: parts[0],
          data: parts.slice(1).map((v) => Number(v)),
        };
      });
      setChartData({
        labels: headers,
        datasets,
      });
    });
  }, [data]);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[400px]">
      <PanelTitle title="시각화 결과" className="text-xl font-bold mb-2" />

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}

      {!isLoading && !error && chartData && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" as const },
              title: { display: true, text: `${clusterType} 기반 Stacked Bar Chart` },
            },
            scales: {
              x: { stacked: true },
              y: { stacked: true },
            },
          }}
        />
      )}
    </div>
  );
}