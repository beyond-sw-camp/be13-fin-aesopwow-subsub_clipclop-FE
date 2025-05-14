import React from "react";
import { TitleNumberBoard } from "../atoms/TitleNumberBoard";
import { StatCardData } from "@/application/viewModels/DashBoardViewModel";

interface BoardGridProps {
    cards?: StatCardData[];
}

export const BoardGrid: React.FC<BoardGridProps> = ({ cards = [] }) => (
    <div className="board-grid">
        {cards?.map((card, idx) => (
            <TitleNumberBoard key={idx} {...card} />
        ))}
    </div>
);
