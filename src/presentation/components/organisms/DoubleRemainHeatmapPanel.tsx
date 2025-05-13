// /presentation/components/organisms/DoubleRemainHeatmapPanel.tsx
import { useAnalysisFileViewModel } from "@/application/viewModels/AnalysisViewModel";
import { getUser } from "@/application/stores/UserStore";
import { useEffect, useState, useRef, useMemo } from "react";
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
  return (
    <div className="flex-1 min-w-0 bg-gray-50 rounded-xl p-4 shadow overflow-auto h-fit">
      <p className="text-sm text-gray-500 mb-2 font-medium">{title}</p>
      <div className="overflow-auto">
        <table className="min-w-full text-center border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((label, idx) => (
                <th key={idx} className="border px-2 py-1 text-xs font-semibold whitespace-nowrap">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => {
              const paddedRow = [...row];
              while (paddedRow.length < maxCols) paddedRow.push("__EMPTY__");
              return (
                <tr key={rowIdx}>
                  {paddedRow.map((cell, cellIdx) => (
                    <td key={cellIdx} className={`border px-2 py-1 text-xs whitespace-nowrap align-top ${cell === "__EMPTY__" ? "bg-white" : getSingleHeatmapColor(cell, cellIdx)}`}>
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
  // ✅ getUser 호출 고정
  const { companyNo } = useMemo(() => getUser(), []);

  // ✅ params 고정
  const params = useMemo(() => ({ firstClusterType, secondClusterType, companyNo }), [firstClusterType, secondClusterType, companyNo]);
  const { data, isLoading, error } = useAnalysisFileViewModel(params);

  const [firstContent, setFirstContent] = useState<string>("");
  const [firstColumns, setFirstColumns] = useState<string[]>([]);
  const [firstRows, setFirstRows] = useState<string[][]>([]);

  const [secondContent, setSecondContent] = useState<string>("");
  const [secondColumns, setSecondColumns] = useState<string[]>([]);
  const [secondRows, setSecondRows] = useState<string[][]>([]);

  const parsedRef = useRef(false);

  useEffect(() => {
    if (!data || parsedRef.current) return;
    parsedRef.current = true;

    data.text().then((text) => {
      const lines = text.trim().split("\n");
      let currentSection = "";
      const tempFirstRows: string[][] = [];
      const tempSecondRows: string[][] = [];

      lines.forEach((line) => {
        if (line === "firstContent") currentSection = "firstContent";
        else if (line === "firstColumns") currentSection = "firstColumns";
        else if (line === "firstRows") currentSection = "firstRows";
        else if (line === "secondContent") currentSection = "secondContent";
        else if (line === "secondColumns") currentSection = "secondColumns";
        else if (line === "secondRows") currentSection = "secondRows";
        else {
          if (currentSection === "firstContent") setFirstContent(line);
          else if (currentSection === "firstColumns") setFirstColumns(line.split(","));
          else if (currentSection === "firstRows") tempFirstRows.push(line.split(","));
          else if (currentSection === "secondContent") setSecondContent(line);
          else if (currentSection === "secondColumns") setSecondColumns(line.split(","));
          else if (currentSection === "secondRows") tempSecondRows.push(line.split(","));
        }
      });

      setFirstRows(tempFirstRows);
      setSecondRows(tempSecondRows);
    });
  }, [data]);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px] overflow-x-auto">
      <PanelTitle title="잔존율 히트맵 (양측 비교)" className="text-xl font-bold mb-2" />
      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {!isLoading && !error && (
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {renderTable(`군집 A - ${firstContent}`, firstColumns, firstRows)}
          {renderTable(`군집 B - ${secondContent}`, secondColumns, secondRows)}
        </div>
      )}
    </div>
  );
}