// // /presentation/components/organisms/EditableListModal.tsx

import { X } from "lucide-react";
import { EditableInfoItem } from "@/presentation/components/molecules/EditableInfoItem";
import { AddButton } from "@/presentation/components/atoms/AddButton";

interface ItemData {
  id: number;
  title: string;
  subtitle: string;
}

interface EditableListModalProps {
  title: string;
  data: ItemData[];
  onClose: () => void;
  onEdit: (id: number, title: string, subtitle: string) => void;
  onDelete: (id: number) => void;
  onAdd?: () => void; // 직원 관리에서만 사용
  addLabel?: string;
}

export function EditableListModal({
  title,
  data,
  onClose,
  onEdit,
  onDelete,
  onAdd,
  addLabel = "추가",
}: EditableListModalProps) {
  const safeData = Array.isArray(data) ? data.filter(item => item && typeof item.id !== "undefined") : [];

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          aria-label="닫기"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold mb-4">{title}</h2>

        <div className="space-y-3">
          {safeData.length === 0 ? (
            <div className="text-center text-gray-500">현재 항목이 없습니다.</div>
          ) : (
            safeData.map((item) => (
              <EditableInfoItem
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                onEdit={onEdit}
                onDelete={() => onDelete(item.id)}
              />
            ))
          )}
        </div>

        {onAdd && (
          <div className="mt-4">
            <AddButton onClick={onAdd} label={addLabel} />
          </div>
        )}
      </div>
    </div>
  );
}
