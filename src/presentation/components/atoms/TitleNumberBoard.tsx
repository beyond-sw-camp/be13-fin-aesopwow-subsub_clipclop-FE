import React from 'react';

interface Props {
    title: string;
    number: number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const TitleNumberBoard = ({ title, number, icon: Icon }: Props) => (
    <div className="stat-card">
        <Icon width={38} height={38} />
        <div className="stat-title">{title}</div>
        <div className="stat-number">{number}</div>
    </div>
);