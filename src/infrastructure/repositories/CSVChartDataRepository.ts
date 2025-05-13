import { ChartDataRepository } from './ChartRepository';
import { ChartData } from '@/core/model/ChartData';

function parseCSV(csv: string): { label: string; value: number }[] {
    const lines = csv.trim().split('\n').slice(1);

    return lines.map(line => {
        const [label, value] = line.split(',');
        return { label, value: Number(value) };
    });
}

export class CSVChartDataRepository implements ChartDataRepository {
    async getChartData(csvData: string): Promise<ChartData> {
        const parsed = parseCSV(csvData);

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
    }
}