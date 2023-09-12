import { CHART_TYPE, LABELS } from './../../constants/index';
import { IChartDataProps, IChartDatabase, TChartDataList } from '../../types';

export const fetchChartData = <T extends IChartDatabase>(chartData: T): T['response'] => {
  const response = chartData.response;

  return response;
};

export const formatResponseData = <T>(response: T): T[] => {
  const responseList = [];

  for (const key in response) {
    if (Object.prototype.hasOwnProperty.call(response, key)) {
      const item: T = {} as T;
      item[key] = response[key];
      responseList.push(item);
    }
  }

  return responseList;
};

export const formatChartData = (chartDataList: TChartDataList) => {
  const initialData: IChartDataProps = { labels: [], ids: [], chartData: [] };

  const { labels, ids, chartData } = chartDataList.reduce((acc, chartData) => {
    const key = Object.keys(chartData)[0];
    const values = Object.values(chartData)[0];

    acc.labels.push(key);
    acc.ids.push(values.id);
    acc.chartData.push({
      dateTime: key,
      id: values.id,
      data: { [CHART_TYPE.BAR]: values[LABELS.BAR], [CHART_TYPE.AREA]: values[LABELS.AREA] },
    });

    return acc;
  }, initialData);

  return { labels, ids, chartData };
};
