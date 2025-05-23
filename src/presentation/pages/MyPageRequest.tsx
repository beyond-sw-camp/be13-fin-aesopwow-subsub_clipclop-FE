interface MyPageRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MyPageRequest({ isOpen, onClose }: MyPageRequestProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-4">요청 내역 관리</h2>
        <p className="text-gray-500">현재 요청 내역이 없습니다.</p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
