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
import { ManageStaffContext } from "../../../store/context";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class ManageStaff extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStaffModalOpen: false,
      isLoading: false,
      searchTerm: "",
      staffRows: [],
      filteredList: [],
      editingStaffMember: null,
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

  editRow = (id) => {
    const editingStaffMember = this.state.staffRows.find((s) => s.id === id);
    this.setState({
      editingStaffMember,
      isStaffModalOpen: true,
    });
  };

  onEditModalClose = () => {
    console.log("onEditModalClose");
    this.setState({
      editingStaffMember: null,
      isStaffModalOpen: false,
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
      <Card>
        <CardContent>
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
                <Grid item xs={10}>
                  <SearchPlugin
                    searchTerm={this.state.searchTerm}
                    updateSearchTerm={this.updateSearchTerm}
                    placeholder={"Search staff by name, title or email"}
                  />
                </Grid>
                <Grid container alignItems="center" item xs={2}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    startIcon={<GroupIcon />}
                    onClick={this.handleModalToggle}
                  >
                    Add staff member
                  </Button>
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
              <StaffForm
                isOpen={this.state.isStaffModalOpen}
                handleModalToggle={this.handleModalToggle}
                staffModel={this.state.editingStaffMember}
                onClose={this.onEditModalClose}
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}
