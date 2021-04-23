import React from "react";

import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import StaffForm from './manage-staff-form';

import NoItem from "../../common/no-item";
import Loading from "../../common/loading";
import SearchPlugin from "../../common/search-plugin";

import { columns } from "./manage-staff-config";

import StaffClient from '../../../api/staff-client';
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

    StaffClient.getAll()
      .then((result) => {
        this.setState({
          staffRows: result.data,
          filteredList: result.data,
          isLoading: false,
        });
      });
  }

  updateSearchTerm = (newValue) => {
    const searchTerm = newValue;
    this.setState({
      searchTerm
    });

    this.filterList(searchTerm);
  };

  filterList = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    this.setState({
      searchTerm: term
    });

    const filteredList = this.state.staffRows.filter(
      (e) =>
        e.name?.toLowerCase().includes(term) ||
        e.email?.toLowerCase().includes(term) ||
        e.title?.toLowerCase().includes(term)
    );

    this.setState({ filteredList });
  };

  deleteRow = (id) => {
    this.setState({
      isLoading: true,
    });

    StaffClient.delete(id)
      .then((result) => {
        const staffRows = this.state.staffRows.filter(item => item.id !== id);
        this.setState({
          staffRows,
          filteredList: staffRows,
          isLoading: false,
        });
      });
  }

  handleModalToggle() {
    this.setState((state) => ({
      isStaffModalOpen: !state.isStaffModalOpen,
    }));
  }

  render() {
    return (
      <div>
        {this.state.isLoading
          ? <Loading />
          : this.state.staffRows.length === 0
            ? (<div>
              <NoItem
                singularItemName="staff"
                addNewItem={this.addNewItem}
              />
            </div>
            )
            : (<div>
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
                  <DataGrid
                    disableColumnResize={true}
                    rows={this.state.filteredList}
                    columns={columns}
                    pageSize={10}
                    fullwidth
                    autoHeight
                    autoWidth
                  />
                </Grid>
              </Grid>
            </div>)
        }
      </div>
    );
  };
};
