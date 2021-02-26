import React from "react";
import Button from "@material-ui/core/Button";
import { DataGrid } from '@material-ui/data-grid';
import { TOUR_ROWS, TOUR_COLUMNS } from './utils/constants';
import CreateTour from "./create-tour";

export default class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourData: [],
      isCreateModalOpen: false
    };
    this.handleCreateModalToggle = this.handleCreateModalToggle.bind(this);
  }

  getData(){
    this.setState({tourData: TOUR_ROWS});
  };

  handleCreateModalToggle() {
    this.setState((state) => ({
      isCreateModalOpen: !state.isCreateModalOpen
    }))
  }

  componentDidMount () {
    this.getData();
  };

  render() {
    return (
        <>
          <Button variant="contained" onClick={this.handleCreateModalToggle}> Create Tour </Button>
          <DataGrid rows={this.state.tourData} columns={TOUR_COLUMNS} autoHeight autoPageSize />
          <CreateTour isOpen={this.state.isCreateModalOpen} handleCreateModalToggle={this.handleCreateModalToggle}/>
        </>
    );
  };
}