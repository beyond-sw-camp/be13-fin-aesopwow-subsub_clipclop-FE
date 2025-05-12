// /presentation/components/molecules/SegmentKeywordSelector.tsx
import { useState } from "react";
import { X } from "lucide-react";

export function SegmentKeywordSelector() {
  const [selectedKeywords, setSelectedKeywords] = useState(["Spring", "Smart", "Modern"]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const labels = ["Eco", "Luxury", "Casual"];
  const colors = ["Red", "Blue", "Green"];
  const sizes = ["S", "M", "L", "XL"];

  const toggleItem = (item: string, list: string[], setList: (value: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 w-72 space-y-4">
      <h3 className="font-semibold text-sm">Keywords</h3>

      {/* 선택된 키워드 */}
      <div className="flex flex-wrap gap-2">
        {selectedKeywords.map((keyword) => (
          <div key={keyword} className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm">
            {keyword}
            <button
              onClick={() => setSelectedKeywords(prev => prev.filter(k => k !== keyword))}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Label 필터 */}
      <div className="space-y-2">
        <p className="text-sm font-semibold">Label</p>
        {labels.map((label, index) => (
          <div key={index} className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={selectedLabels.includes(label)}
              onChange={() => toggleItem(label, selectedLabels, setSelectedLabels)}
              className="mt-1"
            />
            <div>
              <p className="text-sm">{label}</p>
              <p className="text-xs text-gray-400">제품 스타일 라벨</p>
            </div>
          </div>
        ))}
      </div>

      {/* 가격 범위 */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span>Price</span>
          <span>${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      {/* 색상 필터 */}
      <div className="space-y-2">
        <p className="text-sm font-semibold">Color</p>
        {colors.map((color, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedColors.includes(color)}
              onChange={() => toggleItem(color, selectedColors, setSelectedColors)}
            />
            <span className="text-sm">{color}</span>
          </div>
        ))}
      </div>

      {/* 사이즈 필터 */}
      <div className="space-y-2">
        <p className="text-sm font-semibold">Size</p>
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() => toggleItem(size, selectedSizes, setSelectedSizes)}
            />
            <span className="text-sm">{size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
