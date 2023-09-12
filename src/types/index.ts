import { CHART_TYPE } from './../constants/index';
export interface IChartDatabaseItem {
  id: string;
  value_area: number;
  value_bar: number;
}

export interface IChartDatabaseResponse {
  [key: string]: IChartDatabaseItem;
}

export type TChartDataList = IChartDatabaseResponse[];

export interface IChartDatabase {
  type: string;
  version: number;
  response: IChartDatabaseResponse;
}

export interface IChartData {
  id: string;
  dateTime: string;
  data: { [CHART_TYPE.BAR]: number; [CHART_TYPE.AREA]: number };
}

export interface IChartDataProps {
  labels: string[];
  ids: string[];
  chartData: IChartData[];
}
