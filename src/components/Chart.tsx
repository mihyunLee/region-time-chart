import React, { useRef } from 'react';
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
import { TChartDataList } from '../types';
import { TIME_SERIES_CHART_OPTIONS } from '../constants';
import { getSelectedChartId } from '../utils/getSelectedChartId';
import useChartData from '../hooks/useChartData';

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
  const chartData = useChartData(chartDataList, selectedId);

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
