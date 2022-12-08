import React from 'react';
import { Tab } from 'semantic-ui-react';
import '../style/main.css'
import TableCompnent from './table/TableComponent';
import ChartComponent from './chart/ChartComponent';

export default function MainComponent() {

  const mainPanes = [
    { menuItem: 'Data', render: () => <Tab.Pane><TableCompnent /></Tab.Pane> },
    { menuItem: 'Chart', render: () => <Tab.Pane><ChartComponent /></Tab.Pane> }
  ];
  return (
    <div className="container">
      <div className="panelTables">
        <Tab defaultActiveIndex={0} panes={mainPanes} />
      </div>
    </div>
  );
}
