// ProfileButton.tsx
interface ProfileButtonProps {
  type: "plan" | "days";
  label: string;
}

export function ProfileButton({ type, label }: ProfileButtonProps) {
  if (type === "plan") {
    // Ultimate 버튼
    return (
      <button
        className="
          bg-[#FF2C2C]
          text-white
          text-2xl
          font-bold
          py-4
          px-12
          rounded-lg
          shadow-md
          min-w-[160px]
          min-h-[64px]
          flex
          items-center
          justify-center
        "
        style={{ fontFamily: "inherit" }}
      >
        {label}
      </button>
    );
  }

  if (type === "days") {
    // "23 남은 일수" 버튼
    // label이 "23 남은 일수" 형태라면 분리
    const [days, ...rest] = label.split(" ");
    return (
      <div
        className="
          bg-white
          border
          border-gray-300
          rounded-lg
          shadow-md
          min-w-[160px]
          min-h-[64px]
          flex
          flex-col
          items-center
          justify-center
          py-4
          px-12
        "
      >
        <span className="text-3xl font-bold text-gray-900 leading-none">{days}</span>
        <span className="text-base text-gray-500 mt-1">{rest.join(" ")}</span>
      </div>
    );
  }

  return null;
}
