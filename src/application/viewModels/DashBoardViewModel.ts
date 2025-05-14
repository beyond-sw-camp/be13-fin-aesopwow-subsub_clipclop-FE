import { useDashBoardStore } from '@/application/stores/DashBoardStore';
import { DashBoardUsecase } from '@/application/useCases/DashBoardUsecase';

export const useDashBoardViewModel = () => {
    const {
        cards,
        chartData,
        isLoading,
        error,
        setCards,
        setChartData,
        setLoading,
        setError
    } = useDashBoardStore();

    const dashboardUsecase = new DashBoardUsecase();

    const readFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    };

    const handleCSVUpload = async (file: File) => {
        setLoading(true);
        setError(null);

        try {
            const csvText = await readFile(file);
            const { chartData, statCards } = await dashboardUsecase.processCSV(csvText);

            if (!chartData || !statCards) {
                throw new Error("CSV 데이터 처리 실패");
            }

            setChartData(chartData);
            setCards(statCards);

        } catch (err) {
            setError(err instanceof Error ? err : new Error('CSV 처리 실패'));
        } finally {
            setLoading(false);
        }
    };

    // ✅ 수정: label 타입 명시
    const formattedChartData = chartData
        ? {
            ...chartData,
            labels: chartData.labels?.map((label: string) => `Label: ${label}`) || []
        }
        : null;

    return {
        statCards: cards || [],
        chartData: formattedChartData,
        isLoading,
        error,
        handleCSVUpload,
    };
};