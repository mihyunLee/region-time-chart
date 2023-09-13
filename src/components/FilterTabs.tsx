import React from 'react';
import { TChartDataList } from '../types';
import { formatChartData } from '../utils/chartData';
import styled from 'styled-components';

interface IProps {
  chartDataList: TChartDataList;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

export default function FilterTabs({ chartDataList, setSelectedId }: IProps) {
  const { ids } = formatChartData(chartDataList);

  const newIds = ['필터 초기화', ...new Set(ids)];

  return (
    <TabsBar>
      <TabList>
        {newIds.map((id, idx) => (
          <li key={idx}>
            <TabButton type='button' onClick={() => setSelectedId(id)}>
              {id}
            </TabButton>
          </li>
        ))}
      </TabList>
    </TabsBar>
  );
}

const TabsBar = styled.nav`
  display: flex;
  justify-content: center;
`;

const TabList = styled.ul`
  display: flex;
  gap: 10px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: 2px solid var(--gray500);
  border-radius: 48px;
  transition: all 0.2s;
  color: var(--gray300);

  &:focus {
    border: 2px solid var(--blue);
    background-color: var(--blue);
    color: var(--white);
  }
`;
