import { ChartOptions } from 'chart.js';
import { IChartData } from '../types';

export const LABELS = {
  BAR: 'value_bar',
  AREA: 'value_area',
} as const;

export const TOOLTIP_OPTIONS = {
  MODE: 'index',
  INTERSECT: false,
} as const;

export const CHART_TYPE = {
  BAR: 'bar',
  ARIA: 'aria',
} as const;

export const TIME_SERIES_CHART_OPTIONS: ChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '지역별 시계열 차트',
    },
    legend: {
      position: 'bottom' as const,
    },
    tooltip: {
      mode: TOOLTIP_OPTIONS.MODE,
      intersect: TOOLTIP_OPTIONS.INTERSECT,
      callbacks: {
        title: function (context) {
          const dataIndex = context[0].dataIndex;
          const dataPoint = context[0].dataset.data[dataIndex] as unknown as IChartData;
          const { id, dateTime } = dataPoint;

          return `Date: ${dateTime}\nId: ${id}`;
        },
      },
    },
  },
  scales: {
    [CHART_TYPE.BAR]: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      title: {
        display: true,
        text: CHART_TYPE.BAR,
      },
      ticks: {
        stepSize: 5000,
      },
    },
    [CHART_TYPE.ARIA]: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: {
        display: true,
        text: CHART_TYPE.ARIA,
      },
      max: 200,
      ticks: {
        stepSize: 50,
      },
    },
    x: {
      ticks: {
        callback: function (val, index) {
          if (typeof val === 'number') {
            const [date, time] = this.getLabelForValue(val).split(' ');

            if (index === 1) {
              return `${date}일자\n${time}`;
            } else if (index % 7 === 1) {
              return time;
            } else {
              return '';
            }
          } else {
            return '';
          }
        },
        font: {
          size: 14,
        },
      },
    },
  },
};
