// /presentation/components/atoms/EditButton.tsx

interface EditButtonProps {
    onClick: () => void;
}

export function EditButton({ onClick }: EditButtonProps) {
    return (
    <button
        onClick={onClick}
        className="bg-blue-100 text-blue-600 px-3 py-1 rounded">수정
    </button>
    );
}