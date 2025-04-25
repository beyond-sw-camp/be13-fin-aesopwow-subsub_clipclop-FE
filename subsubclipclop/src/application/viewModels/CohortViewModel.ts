import { useState } from "react";

export function useCohortViewModel() {
  const [selectedTab, setSelectedTab] = useState("behavior");

  return {
    selectedTab,
    setSelectedTab,
  };
}