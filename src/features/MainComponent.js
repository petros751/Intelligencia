import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import '../style/main.css'
import TableCompnent from './table/TableComponent';
import ChartComponent from './chart/ChartComponent'


export default function MainComponent() {

  return (
    <Segment>
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <TableCompnent />
          </Grid.Column>
          <Grid.Column style={{margin: 'auto'}}>
            <ChartComponent />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
