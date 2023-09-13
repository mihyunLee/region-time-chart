import { ScriptableContext } from 'chart.js';
import { IChartData } from '../types';

interface IParameter {
  selectedId: string;
  selectedColor: string;
  defaultColor: string;
}

export function setBackgroundForBar({ selectedId, selectedColor, defaultColor }: IParameter) {
  return (ctx: ScriptableContext<'bar'>) => {
    const context = ctx as { raw: IChartData };
    const contextRawId = context?.raw?.id;

    switch (selectedId) {
      case contextRawId:
        return selectedColor;
      case '':
      case '필터 초기화':
        return selectedColor;
      default:
        return defaultColor;
    }
  };
}
