import axios from 'axios';
import Papa from 'papaparse';
import { ChartData as DoughnutChartData } from '@/core/model/ChartData';
import { StatCardData } from '@/application/stores/DashBoardStore';
import { getUser } from '@/application/stores/UserStore';
import { UserIcon } from 'lucide-react';
import { ChartData as ChartJSData } from 'chart.js';

interface DashBoardCharts {
    line: ChartJSData<'line', number[]>;
    doughnut: DoughnutChartData;
    stackedBar: ChartJSData<'bar'>;
}

export class DashBoardUsecase {
    async fetchDashboardData(): Promise<{
        chartData: DashBoardCharts;
        statCards: StatCardData[];
    }> {
        try {
            const { infoDbNo, originTable } = getUser();
            const response = await axios.get(`/api/dash-board/${infoDbNo}/${originTable}`, {
                responseType: 'blob',
            });
            const fullText = await response.data.text();

            // --- 스탯 카드용 파싱 --- //
            const metricsBlock = fullText.split('month,')[0].trim();
            const parsedMetrics = Papa.parse(metricsBlock, { header: true, skipEmptyLines: true });
            const rows = parsedMetrics.data as any[];

            const getMetric = (label: string): number => {
                const row = rows.find((r) => r.metric?.trim() === label);
                if (!row) return 0;
                const value = row.value;
                const num = parseFloat(value);
                if (!isNaN(num)) return num;
                if (typeof value === 'string' && value.includes('Empty DataFrame')) return 0;
                const lines = value.split('\n').filter((line: string) => /^\d+\s/.test(line));
                return lines.length;
            };

            const statCards: StatCardData[] = [
                { title: '총 구독자', value: getMetric('Entire Users'), icon: UserIcon },
                { title: '신규 가입자', value: getMetric('New Users'), icon: UserIcon },
                { title: '활성 사용자', value: getMetric('Active Users'), icon: UserIcon },
                { title: '휴면 사용자', value: getMetric('Dormant Users'), icon: UserIcon },
                { title: '해지율', value: getMetric('Cancellation Rate'), icon: UserIcon },
                { title: '증감률', value: getMetric('Increase Decrease Rate'), icon: UserIcon },
            ];

            // --- 꺾은선 그래프 파싱 --- //
            const increaseRateBlock = fullText.match(/month,subscribers,rate\(\%\)[\s\S]+?(?=\n\n|$)/);
            let lineChartData: ChartJSData<'line', number[]> = { labels: [], datasets: [] };
            if (increaseRateBlock) {
                const parsed = Papa.parse(increaseRateBlock[0].trim(), { header: true, skipEmptyLines: true });
                const rows = parsed.data as any[];
                lineChartData = {
                    labels: rows.map((r) => r.month),
                    datasets: [
                        {
                            label: '구독 증감률(%)',
                            data: rows.map((r) => parseFloat(r['rate(%)'])),
                            borderColor: '#4F46E5',
                            fill: false,
                        },
                    ],
                };
            }

            // --- 도넛 차트 파싱 --- //
            const donutBlock = fullText
                .match(/month,type,basic\(\%\),standard\(\%\),premium\(\%\)[\s\S]+?(?=month,type|month,subscribers|$)/g)
                ?.find((b: string) => b.includes(',new,'));

            let doughnutChartData: DoughnutChartData = { labels: [], datasets: [] };

            if (donutBlock) {
                const parsed = Papa.parse(donutBlock.trim(), {
                    header: true,
                    skipEmptyLines: true,
                });

                const monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                const targetMonth = monthAgo.toISOString().slice(0, 7);

                const targetRow = (parsed.data as any[]).find(
                    (row) => row.month === targetMonth && row.type === 'new'
                ) as Record<string, string>;

                if (targetRow) {
                    doughnutChartData = {
                        labels: ['Basic', 'Standard', 'Premium'],
                        datasets: [
                            {
                                label: `${targetMonth} 신규 유저 비율`,
                                data: [
                                    parseFloat(targetRow['basic(%)']),
                                    parseFloat(targetRow['standard(%)']),
                                    parseFloat(targetRow['premium(%)']),
                                ],
                                backgroundColor: ['#60A5FA', '#A78BFA', '#34D399'],
                            },
                        ],
                    };
                }
            }

            // --- 스택바 차트 파싱 --- //
            const stackedBlock = fullText.match(/month,type,basic\(\%\),standard\(\%\),premium\(\%\)[\s\S]+?(?=month,subscribers|$)/g);
            let stackedBarData: ChartJSData<'bar'> = { labels: [], datasets: [] };

            if (stackedBlock) {
                const parsed = Papa.parse(stackedBlock.join('\n').trim(), { header: true, skipEmptyLines: true });
                const rows = parsed.data as any[];

                const grouped = new Map<string, { active?: any; cancelled?: any }>();

                rows.forEach((row) => {
                    const key = row.month;
                    if (!grouped.has(key)) grouped.set(key, {});
                    const type = row.type as 'active' | 'cancelled';
                    grouped.get(key)![type] = row;
                });

                const labels: string[] = [];
                const basicData: number[] = [];
                const standardData: number[] = [];
                const premiumData: number[] = [];

                [...grouped.entries()].reverse().forEach(([month, types]) => {
                    if (types.active) {
                        labels.push(`${month} Active`);
                        basicData.push(parseFloat(types.active['basic(%)']));
                        standardData.push(parseFloat(types.active['standard(%)']));
                        premiumData.push(parseFloat(types.active['premium(%)']));
                    }
                    if (types.cancelled) {
                        labels.push(`${month} Cancelled`);
                        basicData.push(parseFloat(types.cancelled['basic(%)']));
                        standardData.push(parseFloat(types.cancelled['standard(%)']));
                        premiumData.push(parseFloat(types.cancelled['premium(%)']));
                    }
                    // 시각적 구분용 공백 데이터
                    basicData.push(0);
                    standardData.push(0);
                    premiumData.push(0);
                });

                stackedBarData = {
                    labels,
                    datasets: [
                        {
                            label: 'Basic',
                            data: basicData,
                            backgroundColor: '#60A5FA',
                            categoryPercentage: 0.7,
                            barPercentage: 0.9,
                        },
                        {
                            label: 'Standard',
                            data: standardData,
                            backgroundColor: '#A78BFA',
                            categoryPercentage: 0.7,
                            barPercentage: 0.9,
                        },
                        {
                            label: 'Premium',
                            data: premiumData,
                            backgroundColor: '#34D399',
                            categoryPercentage: 0.7,
                            barPercentage: 0.9,
                        },
                    ],
                };
            }

            const chartData: DashBoardCharts = {
                line: lineChartData,
                doughnut: doughnutChartData,
                stackedBar: stackedBarData,
            };

            return { statCards, chartData };
        } catch (error) {
            console.error('❌ Dashboard CSV 처리 실패:', error);
            throw new Error('CSV 파싱 실패');
        }
    }
}