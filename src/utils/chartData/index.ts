import { IChartdb } from '../../types';

export const fetchChartData = <T extends IChartdb>(chartData: T): T['response'] => {
  const response = chartData.response;

  return response;
};

export const formatChartData = <T>(response: T): T[] => {
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
