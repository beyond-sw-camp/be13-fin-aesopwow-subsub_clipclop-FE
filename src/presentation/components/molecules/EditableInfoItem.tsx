import { EditButton } from '@/presentation/components/atoms/EditButton';
import { DeleteButton } from '@/presentation/components/atoms/DeleteButton';

interface EditableInfoItemProps {
    title: string;
    subtitle: string;
    onEdit: () => void;
    onDelete: () => void;
}

export function EditableInfoItem({
    title,
    subtitle,
    onEdit,
    onDelete,
}: EditableInfoItemProps) {
    return (
    <div className="flex justify-between items-center py-2 border-b">
        <div>
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex gap-2">
            <EditButton onClick={onEdit} />
            <DeleteButton onClick={onDelete} />
        </div>
    </div>
    );
}
