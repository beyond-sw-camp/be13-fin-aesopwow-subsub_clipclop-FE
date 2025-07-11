import { useNavigate } from "react-router-dom";
import { useCohortHistoryViewModel } from "@/application/viewModels/CohortViewModel";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "@/core/utils/useIntersectionObserver";

const formatDateTime = (dateString: string | Date): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "날짜 정보 없음";
    }
    return date.toISOString().slice(0, 19).replace("T", " ") + " UTC";
  } catch (error) {
    return "날짜 정보 없음";
  }
};

interface Props {
  clusterType: string;
  selectedKeys?: string[];
  onSelect?: (key: string) => void;
}

export function CohortHistoryPanel({ clusterType, selectedKeys, onSelect }: Props) {
  const { history, loading, hasMore, loadMore } = useCohortHistoryViewModel(clusterType);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollContainerRef.current) {
      setRootElement(scrollContainerRef.current);
    }
  }, []);

  const loaderRef = useIntersectionObserver({
    callback: () => {
      if (!loading && hasMore) {
        setIsFetching(true);
        loadMore();
        timeoutRef.current = setTimeout(() => {
          setIsFetching(false);
        }, 1000);
      }
    },
    options: rootElement
      ? {
          root: rootElement,
          rootMargin: "30px",
          threshold: 0,
        }
      : undefined,
  });

  useEffect(() => {
    return () => {
      setIsFetching(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const renderStatusIcon = (key: string) => {
    if (key.includes("fail")) return <XCircleIcon className="w-5 h-5 text-red-500" />;
    if (key.includes("processing")) return <ClockIcon className="w-5 h-5 text-gray-500 animate-spin" />;
    return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
  };

  const handleClick = (key: string) => {
    const parts = key.split("/");
    if (parts.length < 4) return;

    if (!parts[0] || !parts[2] || !parts[3]) {
      console.warn("Invalid key format:", key);
      return;
    }

    const infoDbNo = parts[0];
    const clusterType = parts[2];
    const filename = parts[3];
    navigate(
      `/analytics/single/result?infoDbNo=${encodeURIComponent(infoDbNo)}&clusterType=${encodeURIComponent(
        clusterType
      )}&filename=${encodeURIComponent(filename)}`
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold mb-2">요청 내역 리스트</h3>
      <p className="text-sm text-gray-500 mb-4">최근 요청된 분석 파일 목록입니다.</p>

      <div ref={scrollContainerRef} className="max-h-[500px] overflow-y-auto pr-1">
        <ul className="space-y-3">
          {history.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center border-b pb-2 hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                {selectedKeys && onSelect && (
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(item.key)}
                    onChange={() => onSelect(item.key)}
                  />
                )}
                <div className="cursor-pointer" onClick={() => handleClick(item.key)}>
                  <p className="text-sm font-medium">{formatDateTime(item.lastModified)}</p>
                  <p className="text-xs text-gray-500 break-all">{item.key}</p>
                </div>
              </div>
              {renderStatusIcon(item.key)}
            </li>
          ))}
        </ul>

        <div ref={loaderRef} className="w-full h-[1px]" />

        {isFetching && <p className="text-center text-sm text-gray-500 mt-4">데이터 불러오는 중...</p>}
        {!hasMore && !loading && history.length > 0 && (
          <p className="text-center text-gray-400 mt-4">더 이상 항목이 없습니다.</p>
        )}
        {!loading && history.length === 0 && (
          <p className="text-center text-gray-400 mt-4">요청 기록이 없습니다.</p>
        )}
      </div>
    </div>
  );
}