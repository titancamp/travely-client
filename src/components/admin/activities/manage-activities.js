import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { columns } from "./activities-const";
import SearchActivities from "./search-activities";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddEditActivity from "./add-edit-activity";
import ActivityClient from "../../../api/activity-client";
import { ManageActivitiesContext } from "../../../store/context";
import ACTION_TYPES from "../../../utils/datatable-row-action-types";
import ConfirmDialog from "../../user/guest/tourists/component/ConfirmDialog";
import PublicIcon from "@material-ui/icons/Public";

class ManageActivities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activityRows: [],
      filteredActivities: [],
      searchTerm: "",
      typeSearchTerm: "",
      isAddEditActivityModalOpen: false,
      editingActivity: null,
      deletingActivity: null,
    };

    this.init = this.init.bind(this);
    this.filterBySearch = this.filterBySearch.bind(this);
    this.filterByType = this.filterByType.bind(this);
    this.filterList = this.filterList.bind(this);
    this.handleSaveActivityToggle = this.handleSaveActivityToggle.bind(this);
    this.handleRowAction = this.handleRowAction.bind(this);
    this.editRow = this.editRow.bind(this);
    this.confirmDeleteRow = this.confirmDeleteRow.bind(this);
    this.editModalCleanup = this.editModalCleanup.bind(this);
    this.resetDeleteRowDialog = this.resetDeleteRowDialog.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    ActivityClient.getActivities(localStorage.getItem("agencyId")).then(
      ({ data }) => {
        const result = data.map((i) => {
          return {
            ...i,
          };
        });

        this.setState({
          activityRows: result,
          filteredActivities: result,
        });
      }
    );
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

  handleRowAction(actionType, rowData) {
    switch (actionType) {
      case ACTION_TYPES.EDIT:
        this.editRow(rowData.id);
        break;
      case ACTION_TYPES.DELETE:
        this.openDeleteConfirmModal(rowData.id);
        break;
      default:
        console.log("Implementation missing for action type " + actionType);
        break;
    }
  }

  editRow(id) {
    const editingActivity = this.state.filteredActivities.find(
      (a) => a.id === id
    );
    this.setState({
      editingActivity,
      isAddEditActivityModalOpen: true,
    });
  }

  editModalCleanup() {
    this.setState({
      editingActivity: null,
      isAddEditActivityModalOpen: false,
    });
  }

  confirmDeleteRow() {
    ActivityClient.deleteActivity(this.state.deletingActivity).then(() => {
      this.setState({
        deletingActivity: null,
      });
      this.init();
    });
  }

  openDeleteConfirmModal(id) {
    this.setState({
      deletingActivity: id,
    });
  }

  resetDeleteRowDialog() {
    this.setState({
      deletingActivity: null,
    });
  }

  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <SearchActivities filter={this.filterBySearch} />
          </Grid>
          <Grid container alignItems="center" item xs={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.handleSaveActivityToggle}
              startIcon={<PublicIcon />}
            >
              Add activity
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ManageActivitiesContext.Provider
              value={{ onRowAction: this.handleRowAction }}
            >
              <DataGrid
                rows={this.state.filteredActivities}
                columns={columns}
                pageSize={10}
                fullwidth
                autoHeight
                autoWidth
              />
            </ManageActivitiesContext.Provider>
          </Grid>
        </Grid>
        {this.state.isAddEditActivityModalOpen && (
          <AddEditActivity
            isOpen
            handleSaveActivityToggle={this.handleSaveActivityToggle}
            activityModel={this.state.editingActivity}
            onClose={this.editModalCleanup}
            onSave={this.init}
          />
        )}
        <ConfirmDialog
          title={"Are you sure you want to delete the activity"}
          isOpen={this.state.deletingActivity}
          onConfirm={this.confirmDeleteRow}
          onCancel={this.resetDeleteRowDialog}
        />
      </div>
    );
  }
}

export default ManageActivities;
