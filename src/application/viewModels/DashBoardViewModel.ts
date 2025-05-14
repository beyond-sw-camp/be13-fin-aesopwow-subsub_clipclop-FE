import { useEffect, useMemo } from 'react';
import { useDashBoardStore } from '@/application/stores/DashBoardStore';
import { DashBoardUsecase } from '@/application/useCases/DashBoardUsecase';

export const useDashBoardViewModel = () => {
    const store = useDashBoardStore();
    const dashboardUsecase = useMemo(() => new DashBoardUsecase(), []);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        store.setLoading(true);
        try {
            const { chartData, statCards } = await dashboardUsecase.fetchDashboardData();
            store.setChartData(chartData);
            store.setCards(statCards);
        } catch (err) {
            store.setError(err instanceof Error ? err : new Error('오류 발생'));
        } finally {
            store.setLoading(false);
        }
    };

    return {
        statCards: store.cards,
        chartData: store.chartData,
        isLoading: store.isLoading,
        error: store.error,
    };
};