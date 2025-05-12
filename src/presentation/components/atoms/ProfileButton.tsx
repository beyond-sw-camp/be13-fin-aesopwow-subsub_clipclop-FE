interface ProfileButtonProps {
  type: "plan" | "days";
  label: string;
}

export function ProfileButton({ type, label }: ProfileButtonProps) {
  // 플랜 버튼용 클래스
  const planButtonClasses =
    "bg-[#FF2C2C] text-white text-2xl font-bold py-4 px-12 rounded-lg shadow-md min-w-[160px] min-h-[64px] flex items-center justify-center";

  // 일수 표시용 클래스
  const daysButtonClasses =
    "bg-white border border-gray-300 rounded-lg shadow-md min-w-[160px] min-h-[64px] flex flex-col items-center justify-center py-4 px-12";

  if (type === "plan") {
    // Ultimate 버튼
    return (
      <button
        className={planButtonClasses}
        style={{ fontFamily: "inherit" }}
      >
        {label}
      </button>
    );
  }

  if (type === "days") {
    // "23 남은 일수" 버튼
    const [days, ...rest] = label.split(" ");
    return (
      <div className={daysButtonClasses}>
        <span className="text-3xl font-bold text-gray-900 leading-none">{days}</span>
        <span className="text-base text-gray-500 mt-1">{rest.join(" ")}</span>
      </div>
    );
  }

  // 잘못된 타입 처리
  if (process.env.NODE_ENV !== "production") {
    console.warn(`ProfileButton: 지원하지 않는 타입입니다. (type: ${type})`);
  }

  return (
    <button className="bg-gray-200 p-2 rounded">
      {label || "유효하지 않은 버튼 타입"}
    </button>
  );
}
