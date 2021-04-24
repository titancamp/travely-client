import React from "react";

import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import StaffForm from "./manage-staff-form";
import PeopleIcon from "@material-ui/icons/People";

import ACTION_TYPES from "../../../utils/datatable-row-action-types";
import NoItem from "../../common/no-item";
import Loading from "../../common/loading";
import SearchPlugin from "../../common/search-plugin";

import { columns } from "./manage-staff-config";

import StaffClient from "../../../api/staff-client";
import { ManageHotelContext, ManageStaffContext } from "../../../store/context";

export default class ManageStaff extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStaffModalOpen: false,
      isLoading: false,
      searchTerm: "",
      staffRows: [],
      filteredList: [],
    };

    this.handleModalToggle = this.handleModalToggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    StaffClient.getAll().then((result) => {
      this.setState({
        staffRows: result.data,
        filteredList: result.data,
        isLoading: false,
      });
    });
  }

  handleRowAction = (actionType, rowData) => {
    console.log(actionType);
    switch (actionType) {
      case ACTION_TYPES.EDIT:
        this.editRow(rowData.id);
        break;
      case ACTION_TYPES.DELETE:
        this.deleteRow(rowData.id);
        break;
      default:
        console.log("Implementation missing for action type " + actionType);
        break;
    }
  };

  updateSearchTerm = (newValue) => {
    const searchTerm = newValue;
    this.setState({
      searchTerm,
    });

    this.filterList(searchTerm);
  };

  filterList = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    this.setState({
      searchTerm: term,
    });

    const filteredList = this.state.staffRows.filter(
      (e) =>
        e.firstName?.toLowerCase().includes(term) ||
        e.lastName?.toLowerCase().includes(term) ||
        e.email?.toLowerCase().includes(term) ||
        e.title?.toLowerCase().includes(term)
    );

    this.setState({ filteredList });
  };

  deleteRow = (id) => {
    this.setState({
      isLoading: true,
    });

    StaffClient.delete(id).then((result) => {
      const staffRows = this.state.staffRows.filter((item) => item.id !== id);
      this.setState({
        staffRows,
        filteredList: staffRows,
        isLoading: false,
      });
    });
  };

  handleModalToggle() {
    if (this.state.isStaffModalOpen) {
      this.setState({
        isLoading: true,
      });

      StaffClient.getAll().then((result) => {
        this.setState({
          staffRows: result.data,
          filteredList: result.data,
          isLoading: false,
        });
      });
    }
    this.setState((state) => ({
      isStaffModalOpen: !state.isStaffModalOpen,
    }));
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loading />
        ) : this.state.staffRows.length === 0 ? (
          <div>
            <NoItem
              startIcon={PeopleIcon}
              singularItemName="staff"
              addNewItem={this.handleModalToggle}
            />
          </div>
        ) : (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <SearchPlugin
                  searchTerm={this.state.searchTerm}
                  updateSearchTerm={this.updateSearchTerm}
                  placeholder={"Search staff by name, title or email"}
                />
              </Grid>
              <Grid container alignItems="center" item xs={3}>
                <Button
                  variant="outlined"
                  startIcon={<GroupIcon />}
                  onClick={this.handleModalToggle}
                >
                  Add staff member
                </Button>
                <StaffForm
                  isOpen={this.state.isStaffModalOpen}
                  handleModalToggle={this.handleModalToggle}
                />
              </Grid>
              <Grid item xs={12}>
                <ManageStaffContext.Provider
                  value={{ onRowAction: this.handleRowAction }}
                >
                  <DataGrid
                    disableColumnResize={true}
                    rows={this.state.filteredList}
                    columns={columns}
                    pageSize={10}
                    fullwidth
                    autoHeight
                    autoWidth
                  />
                </ManageStaffContext.Provider>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}
