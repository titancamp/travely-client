import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { dummyData, columns } from "./activities-const";
import SearchActivities from "./search-activities";
import ActivityTypeSelect from "./activity-type-select";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddEditActivity from "./add-edit-activity";

class ManageActivities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activityRows: [],
      filteredActivities: [],
      searchTerm: "",
      typeSearchTerm: "",
      isAddEditActivityModalOpen: false,
    };

    this.filterBySearch = this.filterBySearch.bind(this);
    this.filterByType = this.filterByType.bind(this);
    this.filterList = this.filterList.bind(this);
    this.handleSaveActivityToggle = this.handleSaveActivityToggle.bind(this);
  }

  componentDidMount() {
    const activityRows = dummyData;

    this.setState({
      activityRows: activityRows,
      filteredActivities: activityRows,
    });
  }

  filterBySearch(term) {
    this.setState({
      searchTerm: term,
    });
    this.filterList(term, this.state.typeSearchTerm);
  }

  filterByType(term) {
    this.setState({
      typeSearchTerm: term,
    });
    this.filterList(this.state.searchTerm, term);
  }

  filterList(searchTerm, searchByTypeterm) {
    const filteredActivities = this.state.activityRows.filter(
      (e) =>
        (searchTerm === "" ||
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (searchByTypeterm === "" ||
          e.type.toLowerCase().includes(searchByTypeterm.toLowerCase()))
    );
    this.setState({ filteredActivities });
  }

  handleSaveActivityToggle() {
    this.setState((state) => ({
      isAddEditActivityModalOpen: !state.isAddEditActivityModalOpen,
    }));
  }

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <ActivityTypeSelect filterByType={this.filterByType} />
          </Grid>
          <Grid item xs={9}>
            <SearchActivities filter={this.filterBySearch} />
          </Grid>
          <Grid container alignItems="center" item xs={1}>
            <Button variant="contained" onClick={this.handleSaveActivityToggle}>
              New
            </Button>
            <AddEditActivity
              isOpen={this.state.isAddEditActivityModalOpen}
              handleSaveActivityToggle={this.handleSaveActivityToggle}
            />
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              rows={this.state.filteredActivities}
              columns={columns}
              pageSize={10}
              fullwidth
              autoHeight
              autoWidth
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ManageActivities;
