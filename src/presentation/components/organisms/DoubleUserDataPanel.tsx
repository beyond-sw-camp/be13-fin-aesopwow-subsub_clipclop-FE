// /presentation/components/organisms/DoubleUserDataPanel.tsx
import { useAnalysisFileViewModel } from "@/application/viewModels/AnalysisViewModel";
import { getUser } from "@/application/stores/UserStore";
import { useEffect, useMemo, useState, useRef } from "react";
import { UserDataKeywordSelector } from "@/presentation/components/molecules/UserDataKeywordSelector";
import { PanelTitle } from "../atoms/PanelTitle";

interface DoubleUserDataPanelProps {
  firstClusterType: string;
  secondClusterType: string;
}

export function DoubleUserDataPanel({ firstClusterType, secondClusterType }: DoubleUserDataPanelProps) {
  // ✅ getUser 호출 고정
  const { companyNo } = useMemo(() => getUser(), []);

  // ✅ params 고정
  const params = useMemo(
    () => ({ firstClusterType, secondClusterType, companyNo }),
    [firstClusterType, secondClusterType, companyNo]
  );

  const { data, isLoading, error } = useAnalysisFileViewModel(params);

  const [firstTableData, setFirstTableData] = useState<Record<string, string>[]>([]);
  const [secondTableData, setSecondTableData] = useState<Record<string, string>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [activeCluster, setActiveCluster] = useState<'A' | 'B'>('A');
  const [filters, setFilters] = useState<Record<string, boolean>>({});

  const parsedRef = useRef(false);

  const selectedFields = useMemo<string[]>(() => {
    return Object.entries(filters).filter(([_, checked]) => checked).map(([key]) => key);
  }, [filters]);

  useEffect(() => {
    if (!data || parsedRef.current) return;
    parsedRef.current = true;

    data.text().then((text) => {
      const sections = text.trim().split("---");
      if (sections.length !== 2) return;

      const parseTable = (section: string) => {
        const [headerLine, ...rows] = section.trim().split("\n");
        const headerList = headerLine.split(",");
        const parsedRows = rows.map((line) => {
          const values = line.split(",");
          const obj: Record<string, string> = {};
          headerList.forEach((header, idx) => {
            obj[header] = values[idx] ?? "";
          });
          return obj;
        });
        return { headerList, parsedRows };
      };

      const first = parseTable(sections[0]);
      const second = parseTable(sections[1]);

      setHeaders(first.headerList);
      setFilters(first.headerList.reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      setFirstTableData(first.parsedRows);
      setSecondTableData(second.parsedRows);
    });
  }, [data]);

  const activeData = activeCluster === 'A' ? firstTableData : secondTableData;

  const handleExport = () => {
    const csvContent = [
      selectedFields.join(","),
      ...activeData.map((row) =>
        selectedFields
          .map((field) => {
            const rawValue = row[field] ?? "";
            return rawValue.includes(",") || rawValue.includes('"') || rawValue.includes("\n")
              ? `"${rawValue.replace(/"/g, '""')}"`
              : rawValue;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const getButtonStyle = (cluster: 'A' | 'B') =>
    `px-4 py-2 text-sm font-semibold transition rounded-lg ${
      activeCluster === cluster ? 'bg-orange-400 text-black' : 'bg-transparent text-black'
    }`;

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <div className="flex justify-between items-center mb-4">
        <PanelTitle title="유저 데이터 (양측 비교)" className="text-xl font-bold" />
        <button
          onClick={handleExport}
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded"
        >
          데이터 내보내기
        </button>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button className={getButtonStyle('A')} onClick={() => setActiveCluster('A')}>
          {firstClusterType} 기반
        </button>
        <button className={getButtonStyle('B')} onClick={() => setActiveCluster('B')}>
          {secondClusterType} 기반
        </button>
      </div>

      <div className="flex gap-6">
        {headers.length > 0 && (
          <UserDataKeywordSelector filters={filters} onChange={(newFilters) => setFilters(newFilters)} />
        )}
        <div className="flex-1 overflow-x-auto">
          {error && <p className="text-sm text-red-500">{error.message}</p>}
          {isLoading && <p className="text-gray-500">로딩 중...</p>}
          {!isLoading && activeData.length === 0 && !error && (
            <p className="text-gray-500">표시할 데이터가 없습니다.</p>
          )}
          {activeData.length > 0 && (
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {selectedFields.map((label, idx) => (
                    <th key={idx} className="border px-3 py-2">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="text-center">
                    {selectedFields.map((field, colIdx) => (
                      <td key={colIdx} className="border px-3 py-2">
                        {row[field] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}