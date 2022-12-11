import React from 'react';
import { useSelector } from 'react-redux';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { createChartOptions } from './chartOptionsService';
import { dataSliceSelector } from '../table/dataSlice';
import _ from 'lodash';

export default function ChartComponent() {
  const { categories, dataChart } = useSelector(dataSliceSelector);
  return (
    <HighchartsReact
    highcharts={Highcharts}
    options={(() => createChartOptions(categories, dataChart, categories.length))()}
  />
  );
}