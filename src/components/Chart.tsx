import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Title,
  Filler,
} from 'chart.js';
import { Chart as ReactChartJS } from 'react-chartjs-2';
import { TChartDataList } from '../types';
import { AXIS_KEY, CHART_COLOR, CHART_TYPE, LABELS, TIME_SERIES_CHART_OPTIONS } from '../constants';
import { formatChartData } from '../utils/chartData';
import { setBackgroundForBar } from '../utils/setBackgroundForBar';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  Filler,
  LineController,
  BarController,
);

interface IProps {
  chartDataList: TChartDataList;
  selectedId: string;
}

export default function Chart({ chartDataList, selectedId }: IProps) {
  const { labels, chartData: data } = formatChartData(chartDataList);

  const chartData = {
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
        borderColor: 'red',
        backgroundColor: CHART_COLOR.PINK,
        fill: true,
        lineTension: 0.6,
        yAxisID: CHART_TYPE.AREA,
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
        borderWidth: 2,
        yAxisID: CHART_TYPE.BAR,
      },
    ],
  };

  return <ReactChartJS type='bar' data={chartData} options={TIME_SERIES_CHART_OPTIONS} />;
}
