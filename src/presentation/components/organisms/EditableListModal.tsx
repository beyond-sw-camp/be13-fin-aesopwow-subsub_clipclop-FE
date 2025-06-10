// // /presentation/components/organisms/EditableListModal.tsx

import { X } from 'lucide-react';
import { EditableInfoItem } from '@/presentation/components/molecules/EditableInfoItem';
import { AddButton } from '@/presentation/components/atoms/AddButton';
import { useEffect } from "react";
import type { JSX } from "react";

interface ItemData {
  id: number;
  name: string;
  departmentName: string;
}

interface EditableListModalProps {
  title: string;
  data: ItemData[];
  onClose: () => void;
  onEdit: (id: number, name: string, departmentName: string) => void;
  onDelete: (id: number) => void;
  onAdd?: () => void;
  addLabel?: string;
  renderFooter?: () => JSX.Element;
}

export function EditableListModal({
  title,
  data,
  onClose,
  onEdit,
  onDelete,
  onAdd,
  addLabel = '추가',
  renderFooter,
}: EditableListModalProps) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
      aria-labelledby="editable-list-title"
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

        <h2 id="editable-list-title" className="text-lg font-bold mb-4">{title}</h2>

        <div className="space-y-3">
          {Array.isArray(data) ? (
            data.map((item) => (
              <EditableInfoItem
                key={item.id}
                id={item.id}
                title={item.name}
                subtitle={item.departmentName}
                onEdit={onEdit}
                onDelete={() => onDelete(item.id)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">데이터가 없습니다.</p>
          )}
        </div>

        {onAdd && (
          <div className="mt-4">
            <AddButton onClick={onAdd} label={addLabel} />
          </div>
        )}

        {renderFooter && (
          <div className="mt-6 flex justify-end">
            {renderFooter()}
          </div>
        )}
      </div>
    </div>
  );
}