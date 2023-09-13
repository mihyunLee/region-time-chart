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
  AREA: 'area',
} as const;

export const CHART_COLOR = {
  BLUE: 'rgb(51, 102, 255)',
  BLUEALPHA: 'rgba(54,162, 235, 0.3)',
  GREEN: 'rgb(36, 224, 188)',
  GREENPHA: 'rgba(36, 224, 188, 0.5)',
} as const;

export const AXIS_KEY = {
  X: 'dateTime',
  Y: {
    BAR: `data.${CHART_TYPE.BAR}`,
    AREA: `data.${CHART_TYPE.AREA}`,
  },
} as const;

export const TIME_SERIES_CHART_OPTIONS: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
      },
    },
    tooltip: {
      mode: TOOLTIP_OPTIONS.MODE,
      intersect: TOOLTIP_OPTIONS.INTERSECT,
      usePointStyle: true,
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
        color: 'white',
      },
    },
    [CHART_TYPE.AREA]: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: {
        display: true,
        text: CHART_TYPE.AREA,
      },
      max: 200,
      ticks: {
        stepSize: 50,
        color: 'white',
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
        color: 'white',
      },
    },
  },
};
