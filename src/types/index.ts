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
  data: number;
}

export interface IChartDataProps {
  labels: string[];
  barData: IChartData[];
  areaData: IChartData[];
}
