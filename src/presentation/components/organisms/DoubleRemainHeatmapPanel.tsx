import { useCohortDoubleRemainHeatmapViewModel } from "@/application/viewModels/CohortViewModel";
import { PanelTitle } from "../atoms/PanelTitle";

interface DoubleRemainHeatmapPanelProps {
  firstClusterType: string;
  secondClusterType: string;
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

function renderTable(title: string, columns: string[], rows: string[][]) {
  const maxCols = columns.length;
  const filteredRows = rows.filter(row => row.length > 1 && row.some(cell => cell.trim() !== ""));

  return (
    <div className="flex-1 min-w-0 bg-gray-50 rounded-xl p-4 shadow overflow-auto h-fit">
      <p className="text-sm text-gray-500 mb-2 font-medium">{title}</p>
      <div className="overflow-auto">
        <table className="min-w-full text-center border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((label, idx) => (
                <th key={idx} className="border px-2 py-1 text-xs font-semibold whitespace-nowrap">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, rowIdx) => {
              const paddedRow = [...row];
              while (paddedRow.length < maxCols) paddedRow.push("__EMPTY__");

              return (
                <tr key={rowIdx}>
                  {paddedRow.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`border px-2 py-1 text-xs whitespace-nowrap align-top ${
                        cell === "__EMPTY__" ? "bg-white" : getSingleHeatmapColor(cell, cellIdx)
                      }`}
                    >
                      {cell === "__EMPTY__" ? <span className="invisible">0</span> : cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DoubleRemainHeatmapPanel({ firstClusterType, secondClusterType }: DoubleRemainHeatmapPanelProps) {
  const { data, isLoading, error } = useCohortDoubleRemainHeatmapViewModel(firstClusterType, secondClusterType);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px] overflow-x-auto">
      <PanelTitle title="잔존율 히트맵 (양측 비교)" className="text-xl font-bold mb-2" />
      {data?.firstContent && <p className="text-sm text-gray-500 mb-4">{data.firstContent}</p>}

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}

      {data ? (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {renderTable("군집 A", data.firstColumnLabels, data.firstDataRows)}
          {renderTable("군집 B", data.secondColumnLabels, data.secondDataRows)}
        </div>
      ) : (
        !isLoading && !error && <p className="text-sm text-gray-400">히트맵 데이터를 불러올 수 없습니다.</p>
      )}
    </div>
  );
}
