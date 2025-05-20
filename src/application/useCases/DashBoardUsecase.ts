import { StatCardData } from '@/application/stores/DashBoardStore';
import { getInfoDb } from '@/application/stores/UserStore';
import { ChartData } from '@/core/model/ChartData';
import axios from 'axios';
import { UserIcon } from 'lucide-react';

export class DashBoardUsecase {
    async fetchDashboardData(): Promise<{
        chartData: ChartData;
        statCards: StatCardData[];
    }> {
        try {
            const { infoDbNo } = getInfoDb();
            const response = await axios.get(`/api/dash-board/${infoDbNo}`);

            // ✅ Base64 디코딩 후 JSON 파싱
            const base64Data = response.data.data;
            const jsonStr = atob(base64Data);
            const rawData = JSON.parse(jsonStr);

            console.log("📦 디코딩된 대시보드 응답 데이터:", rawData);

            // ✅ 데이터 유효성 검사
            if (
                !rawData ||
                !rawData.labels ||
                !rawData.values ||
                !Array.isArray(rawData.labels) ||
                !Array.isArray(rawData.values)
            ) {
                throw new Error('유효하지 않은 대시보드 데이터 형식');
            }

            if (rawData.labels.length !== rawData.values.length) {
                throw new Error('대시보드 데이터의 라벨과 값의 개수가 일치하지 않습니다');
            }

            // ✅ Chart.js 데이터 구성
            const chartData: ChartData = {
                labels: rawData.labels,
                datasets: [{
                    label: '데이터셋',
                    data: rawData.values,
                    backgroundColor: Array(rawData.values.length).fill('#4F46E5'),
                }]
            };

            // ✅ 통계 카드 데이터 구성
            const statCards: StatCardData[] = [
                { title: "총 구독자", value: rawData.total ?? 0, icon: UserIcon },
                { title: "활성 사용자", value: rawData.active ?? 0, icon: UserIcon },
                { title: "신규 가입자", value: rawData.new ?? 0, icon: UserIcon },
                { title: "해지자", value: rawData.churn ?? 0, icon: UserIcon },
                { title: "휴면 사용자", value: rawData.dormant ?? 0, icon: UserIcon },
            ];

            return { chartData, statCards };
        } catch (error) {
            console.error('대시보드 데이터 조회 실패:', error);
            throw new Error('데이터 조회 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
        }
    }
}