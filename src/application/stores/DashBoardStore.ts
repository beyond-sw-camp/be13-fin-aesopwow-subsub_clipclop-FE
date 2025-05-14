import { create } from 'zustand';
import { ChartData } from '@/core/model/ChartData';
import UserIcon from '@/assets/icons/user.svg?react';

export interface StatCardData {
    title: string;
    value: number | string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DashBoardStoreState {
    cards: StatCardData[];
    chartData: ChartData | null;
    isLoading: boolean;
    error: Error | null;
    setCards: (cards: StatCardData[]) => void;
    setChartData: (data: ChartData | null) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: Error | null) => void;
}

export const useDashBoardStore = create<DashBoardStoreState>((set) => ({
    cards: [
        { title: "총 구독자 수", value: 1050, icon: UserIcon },
        { title: "신규 유저", value: 2300, icon: UserIcon },
        { title: "증감율", value: 20.2, icon: UserIcon },
        { title: "해지율", value: 120, icon: UserIcon },
        { title: "활성 유저", value: 35, icon: UserIcon },
        { title: "휴면 유저", value: 88, icon: UserIcon },
    ],
    chartData: null,
    isLoading: false,
    error: null,
    setCards: (cards) => set({ cards }),
    setChartData: (chartData) => set({ chartData }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
