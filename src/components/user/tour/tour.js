import React from "react";
import Button from "@material-ui/core/Button";
import { DataGrid } from '@material-ui/data-grid';
import { TOUR_ROWS, TOUR_COLUMNS } from './utils/constants';
import CreateTour from "./create-tour";
import AddIcon from '@material-ui/icons/Add';
import "./tour.css"

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
          <div className="create-tour-button">
            <AddIcon className="create-tour-icon" onClick={this.handleCreateModalToggle}/>
            <Button variant="contained" color="primary" onClick={this.handleCreateModalToggle}> Create Tour </Button>
          </div>

          <DataGrid rows={this.state.tourData} columns={TOUR_COLUMNS} autoHeight autoPageSize />
          <CreateTour isOpen={this.state.isCreateModalOpen} handleCreateModalToggle={this.handleCreateModalToggle}/>
        </>
    );
  };
}