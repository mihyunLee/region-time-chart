import { useEffect, useState } from 'react';
import type { ChartData } from 'chart.js';
import { IChartData, TChartDataList } from './../types/index';
import { formatChartData } from '../utils/chartData';
import { setBackgroundForBar } from '../utils/setBackgroundForBar';
import { AXIS_KEY, CHART_COLOR, CHART_TYPE, LABELS } from '../constants';

export default function useChartData(chartDataList: TChartDataList, selectedId: string) {
  const [chartData, setChartData] = useState<ChartData<'bar' | 'line', IChartData[]>>({
    labels: [],
    datasets: [],
  });

  const { labels, chartData: data } = formatChartData(chartDataList);

  const dataConfig: ChartData<'bar' | 'line', IChartData[]> = {
    labels: labels,
    datasets: [
      {
        type: 'line' as const,
        label: LABELS.AREA,
        data: data,
        parsing: {
          xAxisKey: AXIS_KEY.X,
          yAxisKey: AXIS_KEY.Y.AREA,
        },
        borderColor: CHART_COLOR.GREEN,
        backgroundColor: CHART_COLOR.GREENPHA,
        fill: true,
        yAxisID: CHART_TYPE.AREA,
        tension: 0.4,
        pointBorderWidth: 0,
      },
      {
        type: 'bar' as const,
        label: LABELS.BAR,
        data: data,
        parsing: {
          xAxisKey: AXIS_KEY.X,
          yAxisKey: AXIS_KEY.Y.BAR,
        },
        backgroundColor: setBackgroundForBar({
          selectedId,
          selectedColor: CHART_COLOR.BLUE,
          defaultColor: CHART_COLOR.BLUEALPHA,
        }),
        yAxisID: CHART_TYPE.BAR,
      },
    ],
  };

  useEffect(() => {
    setChartData(dataConfig);
  }, [chartDataList, selectedId]);

  return chartData;
}
