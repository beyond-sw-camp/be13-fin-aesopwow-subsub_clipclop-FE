// 📁 /presentation/components/organisms/SingleRemainHeatmapPanel.tsx
import { PanelTitle } from "../atoms/PanelTitle";

interface HeatmapCell {
  row: string;
  col: string;
  value: string;
}

interface Props {
  heatmap: HeatmapCell[];
  isLoading: boolean;
  error: Error | null;
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

export function SingleRemainHeatmapPanel({ heatmap, isLoading, error }: Props) {
  const grouped: Record<string, Record<string, string>> = {};

  heatmap.forEach((cell) => {
    if (!grouped[cell.row]) grouped[cell.row] = {};
    grouped[cell.row][cell.col] = cell.value;
  });

  const colKeys = Array.from(new Set(heatmap.map((h) => h.col))).sort();
  const rowKeys = Array.from(new Set(heatmap.map((h) => h.row)));

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="잔존율 히트맵" className="text-xl font-bold mb-2" />

      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {!isLoading && heatmap.length === 0 && !error && (
        <p className="text-sm text-gray-500">표시할 데이터가 없습니다.</p>
      )}

      {!isLoading && heatmap.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-center border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">구간</th>
                {colKeys.map((col) => (
                  <th key={col} className="border px-4 py-2">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowKeys.map((row) => (
                <tr key={row}>
                  <td className="border px-4 py-2">{row}</td>
                  {colKeys.map((col, idx) => {
                    const value = grouped[row]?.[col] || "";
                    return (
                      <td
                        key={col}
                        className={`border px-4 py-2 ${getSingleHeatmapColor(value, idx + 1)}`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
