// 📁 DashBoardStore.ts
import UserIcon from '@/assets/icons/user.svg?react';
import { ChartData as DoughnutChartData } from '@/core/model/ChartData';
import { ChartData as ChartJSData } from 'chart.js';
import { create } from 'zustand';

export interface StatCardData {
    title: string;
    value: number | string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface DashBoardCharts {
    line: ChartJSData<'line', number[]>;
    doughnut: DoughnutChartData;
    stackedBar: ChartJSData<'bar'>;
}

interface DashBoardStoreState {
    cards: StatCardData[];
    chartData: DashBoardCharts | null;
    isLoading: boolean;
    error: Error | null;
    setCards: (cards: StatCardData[]) => void;
    setChartData: (data: DashBoardCharts | null) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: Error | null) => void;
}

export const useDashBoardStore = create<DashBoardStoreState>((set) => ({
    cards: [],
    chartData: null,
    isLoading: false,
    error: null,
    setCards: (cards) => set({ cards }),
    setChartData: (chartData) => set({ chartData }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));