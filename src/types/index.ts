export interface IChartDataItem {
  id: string;
  value_area: number;
  value_bar: number;
}

export interface IChartData {
  [key: string]: IChartDataItem;
}

export type TChartDataList = IChartData[];

export interface IChartdb {
  type: string;
  version: number;
  response: IChartData;
}