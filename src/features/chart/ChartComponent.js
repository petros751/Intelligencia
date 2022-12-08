import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { createChartOptions } from './chartOptionsService';

export default function ChartComponent() {

  return (
    <HighchartsReact
    highcharts={Highcharts}
    options={(() => createChartOptions())()}
  />
  );
}


// displays a bar chart of term label word counts per page 
// (x: word count, y: record count)