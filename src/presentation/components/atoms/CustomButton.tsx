// /presentation/components/atoms/CustomButton.tsx
interface CustomButtonProps {
  title: string;
  loading: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function CustomButton({
  title,
  loading,
  onClick,
  type = "button",
  disabled = false,
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition 
        ${loading || disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? "처리 중..." : title}
    </button>
  );
}