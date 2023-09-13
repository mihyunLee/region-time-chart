import { ChartData, InteractionItem } from 'chart.js';
import { IChartData } from '../types';

export const getSelectedChartId = (
  element: InteractionItem[],
  chartData: ChartData<'bar' | 'line', IChartData[]>,
) => {
  if (!element.length) return;

  const { datasetIndex, index } = element[0];
  const selectedData = chartData.datasets[datasetIndex].data[index];

  return selectedData.id;
};
