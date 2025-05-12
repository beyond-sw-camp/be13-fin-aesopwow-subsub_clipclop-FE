import React from "react";

interface SectionItemProps {
  subtitle: string;
  content: React.ReactNode | string;
}

export function SectionItem({ subtitle, content }: SectionItemProps) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-medium text-gray-700">{subtitle}</h3>
      <p className="text-sm text-gray-500">{content}</p>
    </div>
  );
}
