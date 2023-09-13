import React from 'react';
import { TChartDataList } from '../types';
import { formatChartData } from '../utils/chartData';
import styled from 'styled-components';
import { FILITER_INIT_TEXT } from '../constants';

interface IProps {
  chartDataList: TChartDataList;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

export default function FilterTabs({ chartDataList, selectedId, setSelectedId }: IProps) {
  const { ids } = formatChartData(chartDataList);

  const newIds = [FILITER_INIT_TEXT, ...new Set(ids)];

  return (
    <TabsBar>
      <TabList>
        {newIds.map((id, idx) => (
          <li key={idx}>
            <TabButton type='button' onClick={() => setSelectedId(id)} active={id === selectedId}>
              {id}
            </TabButton>
          </li>
        ))}
      </TabList>
      <Message>* 상단의 자치구를 클릭하거나 그래프를 클릭하면 그래프가 필터링 됩니다 :D</Message>
    </TabsBar>
  );
}

const TabsBar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
`;

const TabList = styled.ul`
  display: flex;
  gap: 10px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: 2px solid ${({ active }) => (active ? 'var(--blue)' : 'var(--gray500)')};
  border-radius: 48px;
  transition: all 0.2s;
  background-color: ${({ active }) => active && `var(--blue)`};
  color: ${({ active }) => (active ? 'var(--white)' : 'var(--gray300)')};

  &:focus {
    border: 2px solid var(--blue);
    background-color: var(--blue);
    color: var(--white);
  }
`;

const Message = styled.span`
  color: var(--alert);
  font-size: 14px;
`;
