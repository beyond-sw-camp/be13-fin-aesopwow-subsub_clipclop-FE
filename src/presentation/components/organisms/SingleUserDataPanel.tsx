// /presentation/components/organisms/SingleUserDataPanel.tsx
import { useEffect, useState, useRef, useMemo } from "react";
import { useAnalysisFileViewModel } from "@/application/viewModels/AnalysisViewModel";
import { getUser } from "@/application/stores/UserStore";
import { UserDataKeywordSelector } from "@/presentation/components/molecules/UserDataKeywordSelector";

interface SingleUserProps {
  clusterType: string;
}

export function SingleUserDataPanel({ clusterType }: SingleUserProps) {
  // ✅ getUser 호출 고정
  const { companyNo } = useMemo(() => getUser(), []);

  // ✅ params 고정
  const params = useMemo(() => ({ clusterType, companyNo }), [clusterType, companyNo]);
  const { data, error, isLoading } = useAnalysisFileViewModel(params);

  const [parsedData, setParsedData] = useState<Record<string, string>[]>([]);
  const [availableFields, setAvailableFields] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const parsedRef = useRef(false);

  useEffect(() => {
    if (!data || parsedRef.current) return;
    parsedRef.current = true;

    data.text().then((text) => {
      const [headerLine, ...rows] = text.trim().split("\n");
      const headers = headerLine.split(",");
      const result = rows.map((line) => {
        const values = line.split(",");
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] ?? "";
        });
        return obj;
      });

      setParsedData(result);
      setAvailableFields(headers);
      setSelectedFields(headers);
    });
  }, [data]);

  const handleExport = () => {
    const csvContent = [
      selectedFields.join(","),
      ...parsedData.map((row) =>
        selectedFields
          .map((field) => {
            const rawValue = row[field] ?? "";
            if (rawValue.includes(",") || rawValue.includes('"') || rawValue.includes("\n")) {
              return `"${rawValue.replace(/"/g, '""')}"`;
            }
            return rawValue;
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

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">유저 데이터</h2>
        <button
          onClick={handleExport}
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded"
        >
          데이터 내보내기
        </button>
      </div>

      <div className="flex gap-6">
        <UserDataKeywordSelector
          filters={availableFields.reduce((acc, field) => {
            acc[field] = selectedFields.includes(field);
            return acc;
          }, {} as Record<string, boolean>)}
          onChange={(newFilters) => {
            setSelectedFields(Object.entries(newFilters).filter(([_, checked]) => checked).map(([key]) => key));
          }}
        />
        <div className="flex-1 overflow-x-auto">
          {error && <p className="text-sm text-red-500">{error.message}</p>}
          {isLoading && <p className="text-gray-500">로딩 중...</p>}
          {!isLoading && parsedData.length === 0 && !error && (
            <p className="text-gray-500">표시할 데이터가 없습니다.</p>
          )}
          {parsedData.length > 0 && (
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {selectedFields.map((label, idx) => (
                    <th key={idx} className="border px-3 py-2">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedData.map((row, rowIdx) => (
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