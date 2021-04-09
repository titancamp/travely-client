import React from "react";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import { TOUR_ROWS, TOUR_COLUMNS } from "./utils/constants";
import CreateTour from "./create-tour/CreateTour";

export default class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourData: [],
      isCreateModalOpen: false,
    };
    this.handleCreateModalToggle = this.handleCreateModalToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  getData() {
    this.setState({ tourData: TOUR_ROWS });
  }

  handleCreateModalToggle() {
    this.setState((state) => ({
      isCreateModalOpen: !state.isCreateModalOpen,
    }));
  }

  handleClose() {
    this.setState({
      isCreateModalOpen: false,
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <>
        <div className="create-tour-button">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleCreateModalToggle}
          >
            {" "}
            Create Tour{" "}
          </Button>
        </div>

        <DataGrid
          rows={this.state.tourData}
          columns={TOUR_COLUMNS}
          autoHeight
          autoPageSize
        />
        <CreateTour
          isOpen={this.state.isCreateModalOpen}
          handleCreateModalToggle={this.handleCreateModalToggle}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}
