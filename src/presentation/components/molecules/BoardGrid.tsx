import React from 'react';
import { TitleNumberBoard } from "../atoms/TitleNumberBoard";

interface BoardGridProps {
    boards: {
        title: string;
        number: number;
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }[];
}

export const BoardGrid: React.FC<BoardGridProps> = ({ boards }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gap: '32px',
            background: '#ffa726',
            padding: '40px',
            justifyItems: 'center',
            alignItems: 'center',
            minHeight: '100vh',
        }}
    >
        {boards.map((props, idx) => (
            <TitleNumberBoard key={idx} {...props} />
        ))}
    </div>
);