// /presentation/components/atoms/DeleteButton.tsx

interface DeleteButtonProps {
    onClick: () => void;
}

export function DeleteButton({ onClick }: DeleteButtonProps) {
    return (
    <button
        onClick={onClick}
        className="bg-blue-100 text-blue-600 px-3 py-1 rounded">삭제
    </button>
    );
}