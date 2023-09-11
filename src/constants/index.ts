import { ChartOptions } from 'chart.js';

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
          if (typeof val === 'number' && index % 7 === 1) {
            return this.getLabelForValue(val);
          } else {
            return '';
          }
        },
      },
    },
  },
};
