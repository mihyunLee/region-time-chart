import React, { useRef } from 'react';
import type { ChartData } from 'chart.js';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  Filler,
} from 'chart.js';
import { Chart as ReactChartJS, getElementAtEvent } from 'react-chartjs-2';
import { IChartData, TChartDataList } from '../types';
import { AXIS_KEY, CHART_COLOR, CHART_TYPE, LABELS, TIME_SERIES_CHART_OPTIONS } from '../constants';
import { formatChartData } from '../utils/chartData';
import { setBackgroundForBar } from '../utils/setBackgroundForBar';
import { getSelectedChartId } from '../utils/getSelectedChartId';

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
);

interface IProps {
  chartDataList: TChartDataList;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Chart({ chartDataList, selectedId, setSelectedId }: IProps) {
  const { labels, chartData: data } = formatChartData(chartDataList);

  const chartData: ChartData<'bar' | 'line', IChartData[]> = {
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

  // FIXME: useRef에 공식 문서와 같이 ChartJS 타입을 할당하면 타입 에러 발생
  // 임시 처방으로 any 사용
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  const filterId = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { current: currentChartRef } = chartRef;

    if (!currentChartRef) {
      return;
    }

    const clickedChartId = getSelectedChartId(getElementAtEvent(currentChartRef, event), chartData);

    if (clickedChartId) {
      setSelectedId(clickedChartId);
    }
  };

  return (
    <ReactChartJS
      ref={chartRef}
      type='bar'
      data={chartData}
      options={TIME_SERIES_CHART_OPTIONS}
      onClick={filterId}
    />
  );
}
