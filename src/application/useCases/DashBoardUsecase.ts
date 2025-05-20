import axios from 'axios';
import Papa from 'papaparse';
import { ChartData } from '@/core/model/ChartData';
import { StatCardData } from '@/application/stores/DashBoardStore';
import { getUser } from '@/application/stores/UserStore';
import { UserIcon } from 'lucide-react';

export class DashBoardUsecase {
    async fetchDashboardData(): Promise<{
        chartData: ChartData;
        statCards: StatCardData[];
    }> {
        try {
            const { infoDbNo, originTable } = getUser();

const response = await axios.get(`/api/dash-board/${infoDbNo}/${originTable}`, {
  responseType: 'blob',
});
const fullText = await response.data.text(); // ✅ CSV 전체 문자열

console.log("📦 전체 CSV 응답:", fullText.slice(0, 60000));

const firstCsvBlock = fullText.split('month,')[0].trim(); // 첫 번째 CSV 블록 추출
const parsed = Papa.parse(firstCsvBlock, {
  header: true,
  skipEmptyLines: true,
});
const rows = parsed.data as any[];

// metric 추출
const getMetric = (label: string): number => {
  const row = rows.find((r) => r.metric?.trim() === label);
  if (!row) return 0;

  const value = row.value;

  // 1. 숫자형 문자열인 경우
  const num = parseFloat(value);
  if (!isNaN(num)) return num;

  // 2. 빈 데이터프레임 처리
  if (typeof value === 'string' && value.includes('Empty DataFrame')) return 0;

  // 3. pandas 스타일 표 출력인 경우
  const lines = value
    .split('\n')
    .filter((line: string) => /^\d+\s/.test(line)); // ✅ 타입 명시

  return lines.length;
};


// 통계 카드 구성
const statCards: StatCardData[] = [
  { title: '총 구독자', value: getMetric('Entire Users'), icon: UserIcon },
  { title: '활성 사용자', value: getMetric('Active Users'), icon: UserIcon },
  { title: '신규 가입자', value: getMetric('New Users'), icon: UserIcon },
  { title: '해지자', value: getMetric('Cancellation Rate'), icon: UserIcon },
  { title: '휴면 사용자', value: getMetric('Dormant Users'), icon: UserIcon },
];

// 차트 데이터 구성
const chartData: ChartData = {
  labels: rows.map((r) => r.metric),
  datasets: [
    {
      label: '지표값',
      data: rows.map((r) => getMetric(r.metric)),
      backgroundColor: Array(rows.length).fill('#4F46E5'),
    },
  ],
};

return { statCards, chartData };

        } catch (error) {
            console.error('❌ Dashboard CSV 처리 실패:', error);
            throw new Error('CSV 파싱 실패');
        }
    }
}