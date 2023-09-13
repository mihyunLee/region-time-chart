import React, { useState, useEffect } from 'react';
import db from './mock/db.json';
import { TChartDataList } from './types';
import { formatResponseData, fetchChartData } from './utils/chartData';
import Chart from './components/Chart';
import FilterTabs from './components/FilterTabs';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import styled from 'styled-components';
import { FILITER_INIT_TEXT } from './constants';

export default function App() {
  const [chartDataList, setChartDataList] = useState<TChartDataList>([]);
  const [selectedId, setSelectedId] = useState<string>(FILITER_INIT_TEXT);

  useEffect(() => {
    const response = fetchChartData(db);
    const responseList = formatResponseData(response);

    setChartDataList(responseList);
  }, []);

  return (
    <>
      <GlobalStyle />
      <HeaderContainer>
        <Header>서울특별시 자치구별 시계열 차트</Header>
        <FilterTabs
          chartDataList={chartDataList}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </HeaderContainer>
      <ChartContainer>
        <Chart
          chartDataList={chartDataList}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </ChartContainer>
    </>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 48px;
  margin: 36px 18px;
`;

const ChartContainer = styled.article`
  canvas {
    width: 100%;
    height: 80vh;
  }
`;
