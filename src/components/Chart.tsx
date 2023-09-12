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
import { CHART_TYPE, LABELS, TIME_SERIES_CHART_OPTIONS } from '../constants';
import { formatChartData } from '../utils/chartData';

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
}

export default function Chart({ chartDataList }: IProps) {
  const { labels, chartData: data } = formatChartData(chartDataList);

  const chartData = {
    labels: labels,
    datasets: [
      {
        type: 'line' as const,
        label: LABELS.AREA,
        data: data,
        parsing: {
          xAxisKey: 'dateTime',
          yAxisKey: `data.${CHART_TYPE.AREA}`,
        },
        borderColor: 'red',
        backgroundColor: 'rgb(255, 99, 132)',
        fill: true,
        lineTension: 0.6,
        yAxisID: CHART_TYPE.AREA,
      },
      {
        type: 'bar' as const,
        label: LABELS.BAR,
        data: data,
        parsing: {
          xAxisKey: 'dateTime',
          yAxisKey: `data.${CHART_TYPE.BAR}`,
        },
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        yAxisID: CHART_TYPE.BAR,
      },
    ],
  };

  return <ReactChartJS type='bar' data={chartData} options={TIME_SERIES_CHART_OPTIONS} />;
}
