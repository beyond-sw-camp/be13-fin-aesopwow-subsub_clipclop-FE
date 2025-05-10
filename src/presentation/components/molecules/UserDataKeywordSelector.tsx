// /presentation/components/molecules/UserDataKeywordSelector.tsx
interface Props {
  filters: Record<string, boolean>;
  onChange: (filters: Record<string, boolean>) => void;
}

export function UserDataKeywordSelector({ filters, onChange }: Props) {
  const toggle = (key: string) => {
    if (filters[key] !== undefined) {
      onChange({ ...filters, [key]: !filters[key] });
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 w-72 space-y-4 text-sm">
      <h3 className="font-semibold">표시할 필드 선택</h3>
      <div className="space-y-1">
        {[
          ["userId", "유저 ID"],
          ["name", "이름"],
          ["age", "나이"],
          ["country", "국가"],
          ["subscription", "Subscription Type"],
          ["watchTimeHours", "시청 시간"],
          ["lastLogin", "마지막 접속일"],
          ["favoriteGenre", "선호 장르"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={() => toggle(key)}
            />
            {label}
          </label>
        ))}
      </div>

      <h3 className="font-semibold mt-4">장르 필터 (비활성)</h3>
      <div className="space-y-1 text-gray-400">
        {["Action", "Comedy", "Documentary", "Drama", "Horror", "Romance", "Sci-Fi"].map((genre) => (
          <label key={genre} className="flex items-center gap-2">
            <input type="checkbox" disabled checked />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
}