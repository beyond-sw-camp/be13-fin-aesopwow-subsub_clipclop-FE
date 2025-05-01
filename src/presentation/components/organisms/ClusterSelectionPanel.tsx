// /presentation/components/organisms/ClusterSelectionPanel.tsx
import { useState } from "react";

export function ClusterSelectionPanel() {
  const [selectedCluster, setSelectedCluster] = useState("활동");

  const handleStartAnalysis = () => {
    alert(`선택된 군집: ${selectedCluster}`);
    // TODO: 분석 로직 또는 페이지 이동
  };

  return (
    <div className="w-[90%] h-[500px] mx-auto my-12 bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-10">분석 군집 선택</h2>

      <div className="flex items-center space-x-6">
        <select
          value={selectedCluster}
          onChange={(e) => setSelectedCluster(e.target.value)}
          className="px-6 py-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        >
          <option value="활동">활동</option>
          <option value="구독 유형">구독 유형</option>
          <option value="장르">장르</option>
          <option value="접속">접속</option>
        </select>

        <button
          onClick={handleStartAnalysis}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
        >
          분석 시작
        </button>
      </div>
    </div>
  );
}
