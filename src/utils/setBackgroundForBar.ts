import { ScriptableContext } from 'chart.js';
import { IChartData } from '../types';
import { FILITER_INIT_TEXT } from '../constants';

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
      case FILITER_INIT_TEXT:
        return selectedColor;
      default:
        return defaultColor;
    }
  };
}
