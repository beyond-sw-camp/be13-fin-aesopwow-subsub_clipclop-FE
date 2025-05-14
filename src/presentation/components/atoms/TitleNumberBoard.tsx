import React from "react";

interface Props {
    title: string;
    value: number | string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const TitleNumberBoard = ({ title, value, icon: Icon }: Props) => (
    <div className="stat-card">
        <Icon width={32} height={32} style={{ marginBottom: 8 }} />
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
    </div>
);
