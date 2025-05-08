// /presentation/components/organisms/RemainHeatmapPanel.tsx

import { PanelTitle } from "../atoms/PanelTitle";
import { useCohortRemainHeatmapViewModel } from "@/application/viewModels/CohortViewModel";

interface RemainHeatmapPanelProps {
  clusterType: string;
}

export function RemainHeatmapPanel({ clusterType }: RemainHeatmapPanelProps) {
  const { data, loading, error } = useCohortRemainHeatmapViewModel(clusterType);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <h2 className="text-xl font-bold mb-2">잔존율 히트맵</h2>

      {loading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {data && (
        <>
          <PanelTitle title={data.title} />
          <p className="text-sm text-gray-500 mb-4">{data.content}</p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-center border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">날짜</th>
                  {data.columnLabels.map((label, idx) => (
                    <th key={idx} className="border px-4 py-2">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.dataRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}