import { useEffect, useMemo, useState } from "react";
import { useCohortDoubleUserDataSearchResultViewModel } from "@/application/viewModels/CohortViewModel";
import { UserDataKeywordSelector } from "@/presentation/components/molecules/UserDataKeywordSelector";
import { CohortDoubleUserResponse } from "@/core/model/CohortModel";
import { PanelTitle } from "../atoms/PanelTitle";

interface DoubleUserProps {
  firstClusterType: string;
  secondClusterType: string;
}

export function DoubleUserDataPanel({ firstClusterType, secondClusterType }: DoubleUserProps) {
  const [activeCluster, setActiveCluster] = useState<'A' | 'B'>('A');

  const [filters, setFilters] = useState<Record<keyof CohortDoubleUserResponse, boolean>>({
    userId: true,
    name: true,
    age: true,
    country: true,
    subscription: true,
    watchTimeHours: true,
    lastLogin: true,
    favoriteGenre: true,
  });

  const selectedFields = useMemo<(keyof CohortDoubleUserResponse)[]>(() => {
    return Object.entries(filters)
      .filter(([_, checked]) => checked)
      .map(([key]) => key as keyof CohortDoubleUserResponse);
  }, [filters]);

  const { firstData, secondData, error, isLoading, search } = useCohortDoubleUserDataSearchResultViewModel();

  useEffect(() => {
    search(firstClusterType, secondClusterType, selectedFields as string[]);
  }, [firstClusterType, secondClusterType, selectedFields]);

  const activeData = activeCluster === 'A' ? firstData : secondData;

  const handleExport = () => {
    const csvContent = [
      selectedFields.join(","), // 헤더
      ...activeData.map((row) => selectedFields.map((field) => {
        const rawValue = row[field] ?? ''; // null, undefined 방어
        const value = String(rawValue);    // 항상 string 처리

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

      {/* 클러스터 전환 버튼 */}
      <div className="flex justify-center space-x-4 mb-6">
        <button className={getButtonStyle('A')} onClick={() => setActiveCluster('A')}>
          {firstClusterType} 기반
        </button>
        <button className={getButtonStyle('B')} onClick={() => setActiveCluster('B')}>
          {secondClusterType} 기반
        </button>
      </div>

      <div className="flex gap-6">
        <UserDataKeywordSelector filters={filters} onChange={setFilters} />
        <div className="flex-1 overflow-x-auto">
          {error && <p className="text-red-500">{error}</p>}
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