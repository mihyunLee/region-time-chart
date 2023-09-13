import React, { useState, useEffect } from 'react';
import db from './mock/db.json';
import { TChartDataList } from './types';
import { formatResponseData, fetchChartData } from './utils/chartData';
import Chart from './components/Chart';
import FilterTabs from './components/FilterTabs';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  const [chartDataList, setChartDataList] = useState<TChartDataList>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    const response = fetchChartData(db);
    const responseList = formatResponseData(response);

    setChartDataList(responseList);
  }, []);

  return (
    <>
      <GlobalStyle />
      <FilterTabs chartDataList={chartDataList} setSelectedId={setSelectedId} />
      <Chart chartDataList={chartDataList} selectedId={selectedId} setSelectedId={setSelectedId} />
    </>
  );
}

export default App;
