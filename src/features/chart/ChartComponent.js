import React from 'react';
import { useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { createChartOptions } from './chartOptionsService';
import { dataSliceSelector } from '../table/dataSlice';
import _ from 'lodash';

export default function ChartComponent() {
  const { categories, dataChart, loadData } = useSelector(dataSliceSelector);
  return (
    <div>
      <Dimmer active={loadData} inverted>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={10000}
          className="spinner" />
      </Dimmer>
      <HighchartsReact
        highcharts={Highcharts}
        options={(() => createChartOptions(categories, dataChart, categories.length))()}
      />
    </div>
  );
}