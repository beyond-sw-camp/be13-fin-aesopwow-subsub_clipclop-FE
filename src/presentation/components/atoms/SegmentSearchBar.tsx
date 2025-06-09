// /presentation/components/atoms/SegmentSearchBar.tsx
import { useState } from "react";
import { Check } from "lucide-react";

interface TagOption {
  label: string;
  value: string;
}

interface SearchBarProps {
  onSearch: (keyword: string, tag: string) => void;
  tags?: TagOption[]; // ✅ 외부에서 태그 목록 주입 가능
}

export function SegmentSearchBar({ onSearch, tags }: SearchBarProps) {
  const [selectedTag, setSelectedTag] = useState("new");
  const [searchText, setSearchText] = useState("");

  // 기본 태그 목록
  const defaultTags: TagOption[] = [
    { label: "New", value: "new" },
    { label: "Price ascending", value: "asc" },
    { label: "Price descending", value: "desc" },
    { label: "Rating", value: "rating" },
  ];

  const handleSearchClick = () => {
    onSearch(searchText, selectedTag);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const tagList = tags ?? defaultTags;

  return (
    <div className="flex items-center space-x-2">
      {/* 검색 입력창 */}
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown} // ✅ 엔터 입력 대응
        className="w-64 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none"
      />

      {/* 검색 버튼 */}
      <button
        onClick={handleSearchClick}
        className="bg-gray-100 px-4 py-2 text-sm rounded-lg hover:bg-black hover:text-white"
      >
        Search
      </button>

      {/* 태그 목록 버튼 */}
      {tagList.map((tag) => (
        <button
          key={tag.value}
          onClick={() => setSelectedTag(tag.value)}
          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm ${
            selectedTag === tag.value
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {selectedTag === tag.value && <Check size={14} />}
          <span>{tag.label}</span>
        </button>
      ))}
    </div>
  );
}
