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
    <div className="board-grid">
        {boards.map((props, idx) => (
            <TitleNumberBoard key={idx} {...props} />
        ))}
    </div>
);