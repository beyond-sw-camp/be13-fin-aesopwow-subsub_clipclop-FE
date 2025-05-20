// /presentation/components/organisms/SingleRequestListPanel.tsx
import { useNavigate } from "react-router-dom";
import { getUser } from "@/application/stores/UserStore";
import { useRequestListViewModel } from "@/application/viewModels/AnalysisViewModel";

export function SingleRequestListPanel() {
  const { companyNo } = getUser();
  const { data: requestList, isLoading, error } = useRequestListViewModel(companyNo);
  const navigate = useNavigate();

const handleClick = (requireListNo: number, clusterType: string) => {
  navigate(
    `/analytics/single/cohortresult?requireListNo=${requireListNo}&clusterType=${encodeURIComponent(clusterType)}`
  );
};

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4">역대 분석 요청 리스트</h3>

      {isLoading && <p className="text-gray-500">불러오는 중...</p>}
      {error && <p className="text-red-500">에러 발생: {error.message}</p>}

      {requestList.length === 0 && !isLoading ? (
        <p className="text-gray-500">요청된 분석이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {requestList.map((item) => (
            <li
              key={item.requireListNo}
              className="border p-4 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => handleClick(item.requireListNo, item.clusterType)}
            >
              <div className="text-lg font-medium">군집: {item.clusterType}</div>
              <div className="text-sm text-gray-500">요청 일시: {item.createdAt}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
