// MyInfoModal.tsx
import { X } from "lucide-react";
import type { JSX } from "react";
import { useEffect, useRef } from "react";

interface MyInfoItem {
  userNo: number;
  name: string;
  departmentName: string;
  email: string;
  companyName: string;
  roleName: string;
}

interface MyInfoModalProps {
  title: string;
  data: MyInfoItem[];
  onClose: () => void;
  onEdit: (id: number, name: string, departmentName: string) => void;
  onDelete: (userNo: number) => void;
}

export function MyInfoModal({ title, data, onClose, onEdit, onDelete }: MyInfoModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          aria-label="닫기"
        >
          <X size={20} />
        </button>

        <h2 id="modal-title" className="text-lg font-bold mb-4">{title}</h2>

        {data.map((item) => (
          <div key={item.userNo} className="mb-4 p-4 border rounded space-y-1">
            <p><strong>이름:</strong> {item.name}</p>
            <p><strong>부서:</strong> {item.departmentName}</p>
            <p><strong>이메일:</strong> {item.email}</p>
            <p><strong>회사:</strong> {item.companyName}</p>
            <p><strong>역할:</strong> {item.roleName}</p>
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => onEdit(item.userNo, item.name, item.departmentName)}
                className="py-1 px-3 bg-blue-600 text-white rounded"
              >
                수정
              </button>
              <button
                onClick={() => onDelete(item.userNo)}
                className="py-1 px-3 bg-red-500 text-white rounded"
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
