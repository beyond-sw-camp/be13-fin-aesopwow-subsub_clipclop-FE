import { Button } from "@material-tailwind/react";

interface CustomButtonProps {
  title: string;
  loading: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  bgColor?: string;     // ✅ 배경색 (예: "bg-orange-500")
  hoverColor?: string;  // ✅ 호버시 색 (예: "hover:bg-orange-600")
}

export function CustomButton({
  title,
  loading,
  onClick,
  type = "button",
  disabled = false,
  bgColor = "bg-orange-500",
  hoverColor = "hover:bg-orange-600",
}: CustomButtonProps) {
  const baseStyle =
    "text-white font-semibold px-6 py-3 rounded-md border border-black shadow transition";

  const disabledStyle = loading || disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseStyle} ${bgColor} ${hoverColor} ${disabledStyle}`}
    >
      {loading ? "처리 중..." : title}
    </button>
  );
}