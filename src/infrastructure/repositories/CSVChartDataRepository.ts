import { ChartDataRepository } from './ChartRepository';
import { ChartData } from '@/core/model/ChartData';

function parseCSV(csv: string): { label: string; value: number }[] {
    if (!csv || typeof csv !== 'string') {
        return [];
    }

    const lines = csv.trim().split('\n').slice(1);
    if (lines.length === 0) {
        return [];
    }

    return lines.map(line => {
        const [label, value] = line.split(',');
        if (!label || !value) {
            return { label: label || '라벨 없음', value: 0 };
        }

        const parsedValue = Number(value);
        if (isNaN(parsedValue)) {
            return { label, value: 0 };
        }

        return { label, value: Number(value) };
    });
}

export class CSVChartDataRepository implements ChartDataRepository {
    async getChartData(csvData: string): Promise<ChartData> {
        try {
            const parsed = parseCSV(csvData);

            if (parsed.length === 0) {
                return {
                    labels: [],
                    datasets: [{
                        label: 'CSV 데이터',
                        data: [],
                        backgroundColor: [],
                    }],
                };
            }

            return {
                labels: parsed.map(row => row.label),
                datasets: [
                    {
                        label: 'CSV 데이터',
                        data: parsed.map(row => row.value),
                        backgroundColor: parsed.map(() => '#36A2EB'),
                    },
                ],
            };
        } catch (error) {
            // console.error('CSV 데이터 파싱 중 오류 발생:', error);
            throw new Error('CSV 데이터 파싱 중 오류가 발생했습니다: ' +
                (error instanceof Error ? error.message : '알 수 없는 오류'));
        }
    }
}