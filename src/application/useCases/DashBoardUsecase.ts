import { ChartData, StatCardData } from '@/application/stores/DashBoardStore';
import { getUser } from '@/application/stores/UserStore';
import axios from 'axios';
import { UserIcon } from 'lucide-react';

export class DashBoardUsecase {
    async fetchDashboardData(): Promise<{
        chartData: ChartData;
        statCards: StatCardData[];
    }> {
        try {
            const { companyNo } = getUser();
            const response = await axios.get(`/api/dashboard/${companyNo}`);
            const rawData = response.data;

            // 변환 로직 (예시)
            const chartData: ChartData = {
                labels: rawData.labels,
                datasets: [{
                    label: '데이터셋',
                    data: rawData.values,
                    backgroundColor: ['#4F46E5'],
                }]
            };

            const statCards: StatCardData[] = [
                { title: "총 구독자", value: rawData.total, icon: UserIcon },
                // ... 추가 데이터
            ];

            return { chartData, statCards };
        } catch (error) {
            throw new Error('데이터 조회 실패');
        }
    }
}