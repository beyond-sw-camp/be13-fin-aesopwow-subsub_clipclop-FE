// /presentation/components/organisms/SingleRemainHeatmapPanel.tsx
import { useCohortSingleRemainHeatmapViewModel } from "@/application/viewModels/CohortViewModel";
import { PanelTitle } from "../atoms/PanelTitle";

interface SingleRemainHeatmapPanelProps {
  clusterType: string;
}

function getSingleHeatmapColor(value: string, colIndex: number): string {
  if (colIndex <= 1) return "";
  const num = parseFloat(value.replace("%", ""));
  if (isNaN(num)) return "bg-white text-gray-500";

  if (num >= 90) return "bg-blue-500 text-gray-700";
  if (num >= 75) return "bg-blue-400 text-gray-700";
  if (num >= 60) return "bg-blue-300 text-gray-700";
  if (num >= 45) return "bg-blue-200 text-gray-700";
  if (num >= 30) return "bg-blue-100 text-gray-700";
  if (num >= 1) return "bg-blue-50 text-gray-700";
  return "bg-white text-gray-500";
}

export function SingleRemainHeatmapPanel({ clusterType }: SingleRemainHeatmapPanelProps) {
  const { data, isLoading, error } = useCohortSingleRemainHeatmapViewModel(clusterType);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="잔존율 히트맵" className="text-xl font-bold mb-2" />

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {data && (
        <>
          <p className="text-sm text-gray-500 mb-4">{data.content}</p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-center border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {data.columnLabels.map((label, idx) => (
                    <th key={idx} className="border px-4 py-2">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.dataRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`border px-4 py-2 ${getSingleHeatmapColor(cell, cellIndex)}`}
                      >
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