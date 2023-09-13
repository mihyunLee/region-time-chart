import React, { useState, useEffect } from 'react';
import db from './mock/db.json';
import { TChartDataList } from './types';
import { formatResponseData, fetchChartData } from './utils/chartData';
import Chart from './components/Chart';
import FilterTabs from './components/FilterTabs';

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
      <FilterTabs chartDataList={chartDataList} setSelectedId={setSelectedId} />
      <Chart chartDataList={chartDataList} selectedId={selectedId} />;
    </>
  );
}

export default App;
