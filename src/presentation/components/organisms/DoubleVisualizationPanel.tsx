// /presentation/components/organisms/DoubleVisualizationPanel.tsx
import { useState, useEffect, useRef, useMemo } from "react";
import { useAnalysisFileViewModel } from "@/application/viewModels/AnalysisViewModel";
import { getUser } from "@/application/stores/UserStore";
import { PanelTitle } from "../atoms/PanelTitle";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Chart.js 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DoubleVisualizationPanelProps {
  firstClusterType: string;
  secondClusterType: string;
}

export function DoubleVisualizationPanel({ firstClusterType, secondClusterType }: DoubleVisualizationPanelProps) {
  // ✅ getUser 호출 고정
  const { companyNo } = useMemo(() => getUser(), []);

  // ✅ params 고정
  const params = useMemo(
    () => ({ firstClusterType, secondClusterType, companyNo }),
    [firstClusterType, secondClusterType, companyNo]
  );

  const { data, isLoading, error } = useAnalysisFileViewModel(params);

  const [firstChartData, setFirstChartData] = useState<any>(null);
  const [secondChartData, setSecondChartData] = useState<any>(null);
  const [activeCluster, setActiveCluster] = useState<'A' | 'B'>('A');
  const parsedRef = useRef(false);

  useEffect(() => {
    if (!data || parsedRef.current) return;
    parsedRef.current = true;

    data.text().then((text) => {
      const sections = text.trim().split("---");

      const parseChart = (section: string) => {
        const [headerLine, ...rows] = section.trim().split("\n").slice(1);
        const headers = headerLine.split(",").slice(1);
        const datasets = rows.map((line) => {
          const parts = line.split(",");
          return {
            label: parts[0],
            data: parts.slice(1).map((v) => Number(v)),
          };
        });
        return { labels: headers, datasets };
      };

      if (sections.length === 2) {
        setFirstChartData(parseChart(sections[0]));
        setSecondChartData(parseChart(sections[1]));
      }
    });
  }, [data]);

  const getButtonStyle = (cluster: 'A' | 'B') =>
    `px-4 py-2 text-sm font-semibold transition rounded-lg ${
      activeCluster === cluster ? 'bg-orange-400 text-black' : 'bg-transparent text-black'
    }`;

  return (
    <div className="p-6 bg-white rounded-xl shadow h-full min-h-[400px]">
      <PanelTitle title="시각화 결과 (양측 비교)" className="text-xl font-bold mb-4" />

      <div className="flex justify-center space-x-4 mb-6">
        <button className={getButtonStyle('A')} onClick={() => setActiveCluster('A')}>
          {firstClusterType} 기반
        </button>
        <button className={getButtonStyle('B')} onClick={() => setActiveCluster('B')}>
          {secondClusterType} 기반
        </button>
      </div>

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}

      {!isLoading && !error && (
        <div className="w-full h-[400px]">
          {activeCluster === 'A' && firstChartData && (
            <Bar
              data={firstChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" as const },
                  title: { display: true, text: `${firstClusterType} 기반 Stacked Bar Chart` },
                },
                scales: { x: { stacked: true }, y: { stacked: true } },
              }}
            />
          )}
          {activeCluster === 'B' && secondChartData && (
            <Bar
              data={secondChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" as const },
                  title: { display: true, text: `${secondClusterType} 기반 Stacked Bar Chart` },
                },
                scales: { x: { stacked: true }, y: { stacked: true } },
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}