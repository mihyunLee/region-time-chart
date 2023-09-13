import React from 'react';
import { TChartDataList } from '../types';
import { formatChartData } from '../utils/chartData';

interface IProps {
  chartDataList: TChartDataList;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

export default function FilterTabs({ chartDataList, setSelectedId }: IProps) {
  const { ids } = formatChartData(chartDataList);

  const newIds = ['필터 초기화', ...new Set(ids)];

  return (
    <nav>
      <ul>
        {newIds.map((id, idx) => (
          <li key={idx}>
            <button type='button' onClick={() => setSelectedId(id)}>
              {id}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
