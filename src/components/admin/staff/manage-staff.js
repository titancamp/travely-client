import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import { columns } from './manage-staff-const'
import './manage-staff.css'
import UserClient from "../../../api/user-client";

class ManageStaff extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          staffRows: [],
          filteredStaff: [],
          searchTerm: '',
      };

      this.filetBySearch = this.filetBySearch.bind(this);
      // this.filetByType = this.filetByType.bind(this);
      this.filterList = this.filterList.bind(this);
  }

    componentDidMount() {
      UserClient.getAll().then(({data}) => {
        this.setState({
          activityRows: data,
          filteredActivities: data
        });
      });
  }

  filetBySearch =(term) => {
    this.setState({
      searchTerm: term
    });
    this.filterList(term, this.state.term);
  }

  filterList = (searchTerm, searchByTypeterm) => {
    const filteredActivities = this.state.activityRows.filter(e =>
        (searchTerm === ''
          || e.name.toLowerCase().includes(searchTerm.toLowerCase()) 
          || e.address.toLowerCase().includes(searchTerm.toLowerCase())  
        )
        && 
        (searchByTypeterm ==='' 
          || e.type.toLowerCase().includes(searchByTypeterm.toLowerCase()) 
        )
      );
    this.setState({filteredActivities});
  };

  render(){
    return (
      <div>
        <div id="search_bar">
          {/* <div id="search">
            <SearchActivities 
              filter={this.filetBySearch} />
          </div> */}
        </div>

        <DataGrid rows={this.state.filteredStaff} 
                  columns={columns}  
                  pageSize={10}
                  fullwidth
                  autoHeight
                  autoWidth/>
      </div>
    );
  }
};

export default ManageStaff;