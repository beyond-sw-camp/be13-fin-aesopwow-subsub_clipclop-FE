// /presentation/components/atoms/AddButton.tsx

interface AddButtonProps {
    onClick: () => void;
    label: string;
}

export function AddButton({ onClick, label }: AddButtonProps) {
    return (
        <button
        onClick={onClick}
        className="w-full bg-blue-100 text-blue-600 py-2 rounded-md text-center font-medium hover:bg-blue-200">+ {label}
        </button>
    );
}