export const chartOptions = {
  responsive: true,
  onClick: (_event: any, elements: any) => {
    if (elements.length > 0) {
    //   const _datasetIndex = elements[0].datasetIndex;
    //   const _dataIndex = elements[0].index;
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    }
  }
};
