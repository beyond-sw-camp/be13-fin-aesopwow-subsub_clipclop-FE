// /presentation/components/molecules/CohortSegmentSelector.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { TabItem } from "../atoms/TabItem.tsx";

export function CohortTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "행동 코호트", value: "behavior", path: "/analytics/cohorts" },
    { label: "세그먼트", value: "segment", path: "/analytics/segment" },
  ];

  const currentTab = location.pathname.includes("segment") ? "segment" : "behavior";

  const handleTabClick = (value: string) => {
    const tab = tabs.find(t => t.value === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="flex space-x-4">
      {tabs.map((tab) => (
        <TabItem
          key={tab.value}
          label={tab.label}
          value={tab.value}
          selected={currentTab === tab.value}
          onClick={handleTabClick}
        />
      ))}
    </div>
  );
}
