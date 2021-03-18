import React from "react";
import Typography from "@material-ui/core/Typography";
import { DataGrid } from "@material-ui/data-grid";
import ReportTwoToneIcon from "@material-ui/icons/ReportTwoTone";
import { GRID_ROWS, GRID_COLUMNS } from "./utils/constants";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      homeData: [],
    };
  }

  loadData() {
    this.setState({ homeData: GRID_ROWS });
  }

  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <div>
        <Typography variant="h6">
          <ReportTwoToneIcon style={{ fontSize: "25px" }} />
          Bookings with approaching cancellation deadlines
        </Typography>

        <DataGrid
          rows={this.state.homeData}
          columns={GRID_COLUMNS}
          autoHeight
          autoPageSize
        />
      </div>
    );
  }
}
