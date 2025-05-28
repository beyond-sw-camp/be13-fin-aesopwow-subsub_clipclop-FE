import { ChartEvent, ActiveElement } from 'chart.js';

export const chartOptions = {
  responsive: true,
  onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
    if (elements.length > 0) {
      // 필요한 경우 여기에 클릭 이벤트 처리 로직을 추가하세요
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    }
  }
};