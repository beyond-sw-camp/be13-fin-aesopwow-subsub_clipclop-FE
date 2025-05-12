// /presentation/components/organisms/SingleUserDataPanel.tsx
import { useEffect, useMemo, useState } from "react";
import { useSingleUserDataSearchResultViewModel } from "@/application/viewModels/CohortViewModel";
import { UserDataKeywordSelector } from "@/presentation/components/molecules/UserDataKeywordSelector";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";

interface SingleUserProps {
  clusterType: string;
}

export function SingleUserDataPanel({ clusterType }: SingleUserProps) {
  const [filters, setFilters] = useState<Record<keyof CohortSingleUserResponse, boolean>>({
    userId: true,
    name: true,
    age: true,
    country: true,
    subscription: true,
    watchTimeHours: true,
    lastLogin: true,
    favoriteGenre: true,
  });

  const selectedFields = useMemo<(keyof CohortSingleUserResponse)[]>(() => {
    return Object.entries(filters)
      .filter(([_, checked]) => checked)
      .map(([key]) => key as keyof CohortSingleUserResponse);
  }, [filters]);

  const { data, error, isLoading, search } = useSingleUserDataSearchResultViewModel();

  useEffect(() => {
    search(clusterType, selectedFields as string[]);
  }, [clusterType, selectedFields]);

  const handleExport = () => {
    const csvContent = [
      selectedFields.join(","),
      ...data.map((row) => selectedFields.map((field) => {
        const rawValue = row[field] ?? '';
        const value = String(rawValue);

        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(",")),
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
        <UserDataKeywordSelector filters={filters} onChange={setFilters} />
        <div className="flex-1 overflow-x-auto">
          {error && <p className="text-sm text-red-500">{error.message}</p>}
            {isLoading && <p className="text-gray-500">로딩 중...</p>}
            {!isLoading && data.length === 0 && !error && (
              <p className="text-gray-500">표시할 데이터가 없습니다.</p>
            )}
          {data.length > 0 && (
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {selectedFields.map((label, idx) => (
                    <th key={idx} className="border px-3 py-2">{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIdx) => (
                  <tr key={rowIdx} className="text-center">
                    {selectedFields.map((field, colIdx) => (
                      <td key={colIdx} className="border px-3 py-2">
                        {String(row[field])}
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