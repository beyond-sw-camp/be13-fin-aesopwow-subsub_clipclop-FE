// /presentation/components/atoms/SearchBar.tsx
import { useState } from "react";
import { Check } from "lucide-react";

interface SearchBarProps {
  onSearch: () => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [selectedTag, setSelectedTag] = useState("new");
  const [searchText, setSearchText] = useState("");

  const tags = [
    { label: "New", value: "new" },
    { label: "Price ascending", value: "asc" },
    { label: "Price descending", value: "desc" },
    { label: "Rating", value: "rating" },
  ];

  return (
    <div className="flex items-center space-x-2">
      {/* 검색 입력창 (혼자 원형) */}
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-64 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
      />

      {/* 검색 버튼 (따로 분리) */}
      <button
        onClick={onSearch}
        className="bg-gray-100 px-4 py-2 text-sm rounded-lg hover:bg-black hover:text-white"
      >
        Search
      </button>

      {/* 태그 목록 */}
      {tags.map((tag) => (
        <button
          key={tag.value}
          onClick={() => setSelectedTag(tag.value)}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm ${
            selectedTag === tag.value ? "bg-black text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          {selectedTag === tag.value && <Check size={14} />}
          <span>{tag.label}</span>
        </button>
      ))}
    </div>
  );
}