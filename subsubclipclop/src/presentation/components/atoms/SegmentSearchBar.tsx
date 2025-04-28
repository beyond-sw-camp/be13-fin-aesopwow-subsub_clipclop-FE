// /presentation/components/atoms/SegmentSearchBar.tsx
import { useState } from "react";
import { Check } from "lucide-react";

interface SearchBarProps {
  onSearch: (keyword: string, tag: string) => void; // ✅ 수정: keyword, tag를 넘기도록 타입 변경
}

/**
 * Renders a search bar with keyword input and selectable sorting/filtering tags.
 *
 * Invokes the provided {@link onSearch} callback with the current search keyword and selected tag when the search button is clicked.
 *
 * @param onSearch - Callback function called with the search keyword and selected tag value.
 */
export function SegmentSearchBar({ onSearch }: SearchBarProps) {
  const [selectedTag, setSelectedTag] = useState("new");
  const [searchText, setSearchText] = useState("");

  const tags = [
    { label: "New", value: "new" },
    { label: "Price ascending", value: "asc" },
    { label: "Price descending", value: "desc" },
    { label: "Rating", value: "rating" },
  ];

  const handleSearchClick = () => {
    onSearch(searchText, selectedTag); // ✅ 수정: 클릭 시 현재 검색어와 태그를 넘긴다
  };

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
        onClick={handleSearchClick}
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
