import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import { TOUR_ROWS, TOUR_COLUMNS } from './utils/constants';

export default class Tour extends React.Component {
  constructor() {
    super();
    this.state = {
      tourData: []
    };
  }

  getData(){
    this.setState({tourData: TOUR_ROWS});
  };

  componentDidMount () {
    this.getData();
  };

  render() {
    return (
        <DataGrid rows={this.state.tourData} columns={TOUR_COLUMNS} autoHeight='true' autoPageSize='true' />
    );
  };
}