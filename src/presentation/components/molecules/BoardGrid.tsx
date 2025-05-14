import React from "react";
import { TitleNumberBoard } from "../atoms/TitleNumberBoard";
import { StatCardData } from "@/application/stores/DashBoardStore";


interface BoardGridProps {
    cards?: StatCardData[];
}

export const BoardGrid: React.FC<BoardGridProps> = ({ cards = [] }) => (
    <div className="board-grid">
        {cards?.map((card) => (
            <TitleNumberBoard key={card.title} {...card} />
        ))}
    </div>
);
