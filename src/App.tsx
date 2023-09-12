import React, { useState, useEffect } from 'react';
import db from './mock/db.json';
import { TChartDataList } from './types';
import { formatResponseData, fetchChartData } from './utils/chartData';
import Chart from './components/Chart';

function App() {
  const [chartDataList, setChartDataList] = useState<TChartDataList>([]);

  useEffect(() => {
    const response = fetchChartData(db);
    const responseList = formatResponseData(response);

    setChartDataList(responseList);
  }, []);

  return <Chart chartDataList={chartDataList} />;
}

export default App;
