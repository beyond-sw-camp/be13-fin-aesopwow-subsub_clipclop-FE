import { useCohortHistoryViewModel } from "@/application/viewModels/CohortViewModel";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";

interface Props {
  clusterType: string;
}

export function CohortHistoryPanel({ clusterType }: Props) {
  const { history, loading } = useCohortHistoryViewModel(clusterType);

  const renderStatusIcon = (key: string) => {
    if (key.includes("fail")) return <XCircleIcon className="w-5 h-5 text-red-500" />;
    if (key.includes("processing")) return <ClockIcon className="w-5 h-5 text-gray-500 animate-spin" />;
    return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold mb-2">요청 내역 리스트</h3>
      <p className="text-sm text-gray-500 mb-4">최근 요청된 분석 파일 목록입니다.</p>
      <ul className="space-y-3">
        {loading ? (
          <li className="text-gray-500">불러오는 중...</li>
        ) : history.length === 0 ? (
          <li className="text-gray-400">요청 기록이 없습니다.</li>
        ) : (
          history.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="text-sm font-medium">{item.lastModified}</p>
                <p className="text-xs text-gray-500 break-all">{item.key}</p>
              </div>
              {renderStatusIcon(item.key)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
