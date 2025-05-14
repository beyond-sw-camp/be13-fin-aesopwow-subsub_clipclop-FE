import { CSVChartDataRepository } from '@/infrastructure/repositories/CSVChartDataRepository';
import { ChartData } from '@/core/model/ChartData';
import { StatCardData } from '@/application/stores/DashBoardStore';
import UserIcon from '@/assets/icons/user.svg?react';

export class DashBoardUsecase {
    private repository = new CSVChartDataRepository();

    async processCSV(csvText: string): Promise<{
        chartData: ChartData;
        statCards: StatCardData[];
    }> {
        const chartData = await this.repository.getChartData(csvText);

        // ✅ 데이터 유효성 검사
        if (!chartData?.labels || !chartData.datasets?.[0]?.data) {
            throw new Error("CSV 데이터 형식이 올바르지 않습니다.");
        }

        const statCards = this.generateStatCards(chartData);
        return { chartData, statCards };
    }

    private generateStatCards(chartData: ChartData): StatCardData[] {
        const dataset = chartData.datasets[0].data;
        return [
            {
                title: "총 구독자 수",
                value: chartData.labels.length,
                icon: UserIcon,
            },
            {
                title: "평균 값",
                value: this.calculateAverage(dataset).toFixed(1),
                icon: UserIcon,
            },
            // ... 추가 스탯카드
        ];
    }

    private calculateAverage(arr: number[]): number {
        return arr.length > 0
            ? arr.reduce((a, b) => a + b, 0) / arr.length
            : 0;
    }
}