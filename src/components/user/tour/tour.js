import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import ToutApi from "../../../api/tour-client";
import * as Const from './utils/constants';

export default class Tour extends React.Component {

  getData(){
    // new ToutApi()
    //   .getAllTours()
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
  };

  componentDidMount () {
    this.getData();
  };

  render() {
    return (
        <DataGrid rows={Const.TourRows} columns={Const.TourColumns} autoHeight='true' autoPageSize='true' />
    );
  };
}