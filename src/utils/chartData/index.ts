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
  const initialData: IChartDataProps = { labels: [], barData: [], areaData: [] };

  const { labels, barData, areaData } = chartDataList.reduce((acc, chartData) => {
    const key = Object.keys(chartData)[0];
    const values = Object.values(chartData)[0];

    acc.labels.push(key);
    acc.barData.push({ dateTime: key, id: values.id, data: values.value_bar });
    acc.areaData.push({ dateTime: key, id: values.id, data: values.value_area });

    return acc;
  }, initialData);

  return { labels, barData, areaData };
};
