// 📁 /presentation/components/organisms/DoubleUserDataPanel.tsx
import { useMemo, useState } from "react";
import { useCohortDoubleAnalysisViewModel } from "@/application/viewModels/CohortViewModel";
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

  // ✅ userData 가져오는 부분 수정됨
  const { resultA, resultB, isLoading, error } = useCohortDoubleAnalysisViewModel(
    firstClusterType,
    secondClusterType
  );

  const activeData = activeCluster === 'A' ? resultA.userData : resultB.userData;
  const noData = !isLoading && !error && activeData.length === 0;

  const handleExport = () => {
    const csvContent = [
      selectedFields.join(","),
      ...activeData.map((row) =>
        selectedFields.map((field) => {
          const rawValue = row[field] ?? "";
          const value = String(rawValue);
          return value.includes(",") || value.includes('"') || value.includes("\n")
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        }).join(",")
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
      activeCluster === cluster ? 'bg-orange-400 text-black' : 'bg-gray-200 text-gray-800'
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
          {error && <p className="text-sm text-red-500">{error.message}</p>}
          {isLoading && <p className="text-gray-500">로딩 중...</p>}
          {noData && <p className="text-gray-500">표시할 데이터가 없습니다.</p>}
          {!isLoading && activeData.length > 0 && (
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
