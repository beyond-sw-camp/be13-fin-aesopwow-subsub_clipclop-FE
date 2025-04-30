// /presentation/components/organisms/SegmentSearchResultModal.tsx
import { useEffect } from "react";
import { useSegmentSearchResultViewModel } from "@/application/viewModels/SegmentSearchResultViewModel.ts"; // ✅ ViewModel 가져오기

interface SegmentSearchResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyword: string;
  tag: string;
}

export function SegmentSearchResultModal({ isOpen, onClose, keyword, tag }: SegmentSearchResultModalProps) {
  const { data, error, search } = useSegmentSearchResultViewModel();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      search(keyword, tag);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, keyword, tag]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">검색 결과</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {/* 선택한 필드 */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">선택한 필드</h3>
            <p className="text-gray-600 text-sm">{data?.field || "선택한 필드 설명이 없습니다."}</p>
          </div>

          {/* 문제 */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">문제</h3>
            <p className="text-gray-600 text-sm">{data?.problem || "문제 설명이 없습니다."}</p>
          </div>

          {/* 추천 액션 */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">추천 액션</h3>
            {data?.actions && data.actions.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {data.actions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">추천 액션이 없습니다.</p>
            )}
          </div>
        </div>

        <button
          className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
