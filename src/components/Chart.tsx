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

interface IData {
  labels: string[];
  barData: number[];
  areaData: number[];
}

export default function Chart({ chartDataList }: IProps) {
  const initialData: IData = { labels: [], barData: [], areaData: [] };

  const { labels, barData, areaData } = chartDataList.reduce((acc, chartData) => {
    const key = Object.keys(chartData)[0].split(' ');
    const values = Object.values(chartData)[0];

    acc.labels.push(key[1]);
    acc.barData.push(values.value_bar);
    acc.areaData.push(values.value_area);

    return acc;
  }, initialData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        type: 'bar' as const,
        label: LABELS.BAR,
        data: barData,
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        yAxisID: CHART_TYPE.BAR,
      },
      {
        type: 'line' as const,
        label: LABELS.AREA,
        data: areaData,
        borderColor: 'red',
        backgroundColor: 'rgb(255, 99, 132)',
        fill: true,
        lineTension: 0.6,
        yAxisID: CHART_TYPE.ARIA,
      },
    ],
  };

  return <ReactChartJS type='bar' data={chartData} options={TIME_SERIES_CHART_OPTIONS} />;
}