// 📁 /presentation/components/organisms/DoubleRemainHeatmapPanel.tsx
import { PanelTitle } from "../atoms/PanelTitle";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"


interface DoubleRemainHeatmapPanelProps {
  heatmapA: { row: string; col: string; value: string }[];
  heatmapB: { row: string; col: string; value: string }[];
  insightA?: string;
  isLoading: boolean;
  error: Error | null;
}

function getSingleHeatmapColor(value: string, colIndex: number): string {
  if (colIndex <= 1) return "";
  const num = parseFloat(value.replace("%", ""));
  if (isNaN(num)) return "bg-white text-gray-500";

  if (num >= 90) return "bg-blue-900 text-white";
  if (num >= 80) return "bg-blue-800 text-white";
  if (num >= 70) return "bg-blue-700 text-white";
  if (num >= 60) return "bg-blue-600 text-white";
  if (num >= 50) return "bg-blue-500 text-white";
  if (num >= 40) return "bg-blue-400 text-gray-800";
  if (num >= 30) return "bg-blue-300 text-gray-800";
  if (num >= 20) return "bg-blue-200 text-gray-800";
  if (num >= 10) return "bg-blue-100 text-gray-800";
  if (num >= 1)  return "bg-blue-50 text-gray-800";
  return "bg-white text-gray-500";
}

function convertHeatmapToTable(heatmap: { row: string; col: string; value: string }[]) {
  const rowMap: Record<string, Record<string, string>> = {};
  const colSet: Set<string> = new Set();

  heatmap.forEach(({ row, col, value }) => {
    if (!rowMap[row]) rowMap[row] = {};
    rowMap[row][col] = value;
    colSet.add(col);
  });

  const colLabels = Array.from(colSet).sort();
  const rows = Object.entries(rowMap).map(([rowLabel, colData]) => {
    const row: string[] = [rowLabel];
    colLabels.forEach((col) => {
      row.push(colData[col] || "");
    });
    return row;
  });

  return { colLabels: ["구분", ...colLabels], rows };
}

function renderTable(title: string, columns: string[], rows: string[][]) {
  const maxCols = columns.length;
  const filteredRows = rows.filter(
    (row) => row.length > 1 && row.some((cell) => cell.trim() !== "")
  );

  return (
    <div className="flex-1 min-w-0 bg-gray-50 rounded-xl p-4 shadow overflow-auto h-fit">
      <p className="text-sm text-gray-500 mb-2 font-medium">{title}</p>
      <table className="min-w-full text-center border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((label, idx) => (
              <th
                key={idx}
                className="border px-2 py-1 text-xs font-semibold whitespace-nowrap"
              >
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
                    className={`border px-2 py-1 text-xs whitespace-nowrap align-top ${cell === "__EMPTY__"
                      ? "bg-white"
                      : getSingleHeatmapColor(cell, cellIdx)
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
  );
}

export function DoubleRemainHeatmapPanel({
  heatmapA,
  heatmapB,
  insightA,
  isLoading,
  error,
}: DoubleRemainHeatmapPanelProps) {
  const noData =
    !isLoading &&
    !error &&
    (heatmapA.length === 0 || heatmapB.length === 0);

  const tableA = convertHeatmapToTable(heatmapA);
  const tableB = convertHeatmapToTable(heatmapB);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px] overflow-x-auto">
      <PanelTitle title="잔존율 히트맵 (양측 비교)" className="text-xl font-bold mb-2" />

      {insightA && (
        <p className="text-sm text-gray-500 mb-4">{insightA}</p>
      )}

      {isLoading && <DotWaveLoader color="black" />}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {noData && (
        <p className="text-sm text-gray-500">표시할 히트맵 데이터가 없습니다.</p>
      )}

      {!isLoading && !error && (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {renderTable("군집 A", tableA.colLabels, tableA.rows)}
          {renderTable("군집 B", tableB.colLabels, tableB.rows)}
        </div>
      )}
    </div>
  );
}
