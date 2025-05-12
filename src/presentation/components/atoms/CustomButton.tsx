// /presentation/components/atoms/CustomButton.tsx
interface CustomButtonProps {
  title: string;
  loading: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  color?: "orange" | "green"; // 🎯 추가
}

export function CustomButton({
  title,
  loading,
  onClick,
  type = "button",
  disabled = false,
  color = "orange",
}: CustomButtonProps) {
  const baseStyle =
    "text-white font-semibold px-6 py-3 rounded-md border border-black shadow transition";

  const colorStyle =
    color === "orange"
      ? "bg-orange-500 hover:bg-orange-600"
      : "bg-green-600 hover:bg-green-700";

  const disabledStyle = loading || disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseStyle} ${colorStyle} ${disabledStyle}`}
    >
      {loading ? "처리 중..." : title}
    </button>
  );
}