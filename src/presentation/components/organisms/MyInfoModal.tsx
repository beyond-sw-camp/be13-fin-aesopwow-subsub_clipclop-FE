import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { JSX } from "react";

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

export function MyInfoModal({
  title,
  data,
  onClose,
  onEdit,
  onDelete,
}: MyInfoModalProps): JSX.Element {
  useRef<HTMLDivElement>(null);
  const [editState, setEditState] = useState<Record<number, boolean>>({});
  const [editName, setEditName] = useState<Record<number, string>>({});
  const [editDept, setEditDept] = useState<Record<number, string>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const startEditing = (userNo: number, name: string, dept: string) => {
    setEditState((prev) => ({ ...prev, [userNo]: true }));
    setEditName((prev) => ({ ...prev, [userNo]: name }));
    setEditDept((prev) => ({ ...prev, [userNo]: dept }));
  };

  const cancelEditing = (userNo: number) => {
    setEditState((prev) => ({ ...prev, [userNo]: false }));
  };

  const handleSave = (userNo: number) => {
    onEdit(userNo, editName[userNo], editDept[userNo]);
    setEditState((prev) => ({ ...prev, [userNo]: false }));
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

        {data.map((item) => {
          const isEditing = editState[item.userNo];

          return (
            <div key={item.userNo} className="mb-4 p-4 border rounded space-y-1">
              <div>
                <p><strong>이메일:</strong> {item.email}</p>
                <p><strong>회사:</strong> {item.companyName}</p>
                <p><strong>역할:</strong> {item.roleName}</p>

                {isEditing ? (
                  <>
                    <div className="space-y-1">
                      <input
                          aria-label="이름"
                          placeholder="이름"
                        value={editName[item.userNo] || ""}
                        onChange={(e) =>
                          setEditName((prev) => ({
                            ...prev,
                            [item.userNo]: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                      <input
                          aria-label="부서명"
                          placeholder="부서명"
                        value={editDept[item.userNo] || ""}
                        onChange={(e) =>
                          setEditDept((prev) => ({
                            ...prev,
                            [item.userNo]: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 w-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>이름:</strong> {item.name}</p>
                    <p><strong>부서:</strong> {item.departmentName}</p>
                  </>
                )}
              </div>

              <div className="mt-3 flex justify-end gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSave(item.userNo)}
                      className="py-1 px-3 bg-blue-600 text-white rounded"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => cancelEditing(item.userNo)}
                      className="py-1 px-3 bg-gray-400 text-white rounded"
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditing(item.userNo, item.name, item.departmentName)}
                      className="py-1 px-3 bg-green-500 text-white rounded"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => onDelete(item.userNo)}
                      className="py-1 px-3 bg-red-500 text-white rounded"
                    >
                      회원 탈퇴
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
