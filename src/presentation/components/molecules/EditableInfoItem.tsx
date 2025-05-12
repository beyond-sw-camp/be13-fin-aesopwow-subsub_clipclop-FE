import { useState } from 'react';
import { EditButton } from '@/presentation/components/atoms/EditButton';
import { DeleteButton } from '@/presentation/components/atoms/DeleteButton';

interface EditableInfoItemProps {
    id: number;
    title: string;
    subtitle: string;
    onEdit: (id: number, title: string, subtitle: string) => void;
    onDelete: () => void;
}

export function EditableInfoItem({
    id,
    title,
    subtitle,
    onEdit,
    onDelete,
}: EditableInfoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editSubtitle, setEditSubtitle] = useState(subtitle);

    const handleSave = () => {
        onEdit(id, editTitle, editSubtitle);
        setIsEditing(false);
    };

    return (
        <div className="flex justify-between items-center border-b py-2">
            <div>
                {isEditing ? (
                <>
                    <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border rounded px-2 py-1 mb-1 block"
                    />
                    <input
                        value={editSubtitle}
                        onChange={(e) => setEditSubtitle(e.target.value)}
                        className="border rounded px-2 py-1 text-sm text-gray-500"
                    />
                </>
            ) : (
                <>
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-gray-500">{subtitle}</div>
                </>
            )}
            </div>

            <div className="flex gap-2">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="bg-green-100 text-green-600 px-3 py-1 rounded">저장
                </button>
                ) : (
                    <EditButton onClick={() => setIsEditing(true)} />
                )}
                <DeleteButton onClick={onDelete} />
            </div>
        </div>
    );
}