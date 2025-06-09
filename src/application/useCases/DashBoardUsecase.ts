import axios from 'axios';
import Papa from 'papaparse';
import '@/chart/ChartRegister';
import { ChartData as DoughnutChartData } from '@/core/model/ChartData';
import { StatCardData } from '@/application/stores/DashBoardStore';
import { getUser } from '@/application/stores/UserStore';
import { User } from 'lucide-react';
import { ChartData as ChartJSData } from 'chart.js';
import { DashBoardCharts } from '@/application/stores/DashBoardStore';
import axiosInstance from '@/infrastructure/api/Axios';
import { userInfo } from 'os';

interface SubscriptionTypeRow {
    month: string;
    type: 'active' | 'cancelled' | 'new';
    'basic(%)': string;
    'standard(%)': string;
    'premium(%)': string;
}

export class DashBoardUsecase {
    async fetchDashboardData(): Promise<{
        chartData: DashBoardCharts;
        statCards: StatCardData[];
    }> {
        const { infoDbNo, originTable } = getUser();

        if (!infoDbNo) {
            throw new Error('대시보드 데이터를 요청하기 위한 파라미터가 유효하지 않습니다.');
        }

        let fullText: string = '';

        try {
            const response = await axiosInstance.get(`/dash-board`, {
                params: { infoDbNo, user_info: 'user_info', user_sub_info: 'user_sub_info' },
                responseType: 'blob',
            });
            fullText = await response.data.text();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    throw new Error(`대시보드 데이터 요청 실패: 서버 응답 코드 ${error.response.status}`);
                } else if (error.request) {
                    throw new Error('대시보드 데이터 요청 실패: 서버로부터 응답이 없습니다');
                } else {
                    throw new Error(`대시보드 데이터 요청 설정 오류: ${error.message}`);
                }
            } else {
                throw new Error('대시보드 데이터 요청 중 알 수 없는 오류 발생');
            }
        }

        try {
            // --- 스탯 카드용 파싱 --- //
            const metricsBlock = fullText.split(/\n\s*\n/)[0].trim();
            const parsedMetrics = Papa.parse(metricsBlock, { header: true, skipEmptyLines: true });
            interface MetricRow {
                metric: string;
                value: string;
            }
            const rows = parsedMetrics.data as MetricRow[];

            const metricMap = Object.fromEntries(rows.map((r) => [r.metric?.trim(), r.value]));

            const getMetric = (label: string): number => {
                const value = metricMap[label];
                if (!value) return 0;
                const num = parseFloat(value);
                if (!isNaN(num)) return num;
                if (typeof value === 'string' && value.includes('Empty DataFrame')) return 0;
                const lines = value.split('\n').filter((line: string) => /^\d+\s/.test(line));
                return lines.length;
            };

            const statCards: StatCardData[] = [
                { title: '총 구독자', value: getMetric('Entire Users'), icon: User },
                { title: '신규 가입자', value: getMetric('New Users'), icon: User },
                { title: '활성 사용자', value: getMetric('Active Users'), icon: User },
                { title: '휴면 사용자', value: getMetric('Dormant Users'), icon: User },
                { title: '해지율', value: getMetric('Cancellation Rate'), icon: User },
                { title: '증감률', value: getMetric('Increase Decrease Rate'), icon: User },
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
                const parsed = Papa.parse(donutBlock.trim(), { header: true, skipEmptyLines: true });
                const monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                const targetMonth = monthAgo.toISOString().slice(0, 7);

                const targetRow = (parsed.data as SubscriptionTypeRow[]).find(
                    (row) => row.month === targetMonth && row.type === 'new'
                );

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
                const parsed = Papa.parse<SubscriptionTypeRow>(stackedBlock.join('\n').trim(), {
                    header: true,
                    skipEmptyLines: true,
                });
                const rows = parsed.data;

                const groupByMonth = (
                    rows: SubscriptionTypeRow[]
                ): Map<string, { active?: SubscriptionTypeRow; cancelled?: SubscriptionTypeRow }> => {
                    const grouped = new Map<string, { active?: SubscriptionTypeRow; cancelled?: SubscriptionTypeRow }>();
                    rows.forEach((row) => {
                        const key = row.month;
                        if (!grouped.has(key)) grouped.set(key, {});
                        if (row.type === 'active' || row.type === 'cancelled') {
                            grouped.get(key)![row.type] = row;
                        }
                    });
                    return grouped;
                };

                const createChartDataFromGroups = (
                    grouped: Map<string, { active?: SubscriptionTypeRow; cancelled?: SubscriptionTypeRow }>
                ) => {
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
                        basicData.push(0);
                        standardData.push(0);
                        premiumData.push(0);
                    });

                    return { labels, basicData, standardData, premiumData };
                };

                const grouped = groupByMonth(rows);
                const { labels, basicData, standardData, premiumData } = createChartDataFromGroups(grouped);

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
            if (error instanceof Error) {
                throw new Error(`CSV 파싱 실패: ${error.message}`);
            } else {
                throw new Error('CSV 파싱 중 알 수 없는 오류 발생');
            }
        }
    }
}