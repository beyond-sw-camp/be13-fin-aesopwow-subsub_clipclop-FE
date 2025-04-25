// /presentation/components/molecules/CohortTabs.tsx
import { useState } from "react";

export function CohortTabs() {
  const [selectedTab, setSelectedTab] = useState("behavior");
  const tabs = [
    { label: "행동 코호트", value: "behavior" },
    { label: "세그먼트", value: "segment" },
  ];

  return (
    <div className="flex space-x-2">
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition
              ${isSelected ? 'bg-white text-black shadow' : 'text-black bg-transparent'}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}