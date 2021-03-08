import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import { dummyData, columns } from './activities-const'
import SearchActivities  from './search-activities'
import ActivityTypeSelect from './activity-type-select';
import './activities.css'

class ManageActivities extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          activityRows: [],
          filteredActivities: [],
          searchTerm: '',
          typeSeatchTerm: ''
      };

      this.filetBySearch = this.filetBySearch.bind(this);
      this.filetByType = this.filetByType.bind(this);
      this.filterList = this.filterList.bind(this);
  }

    componentDidMount() {

      const activityRows = dummyData;

      this.setState({
        activityRows: activityRows,
        filteredActivities: activityRows
      });
  }

  filetBySearch =(term) => {
    this.setState({
      searchTerm: term
    });
    this.filterList(term, this.state.typeSeatchTerm);
  }

  filetByType =(term) => {
    this.setState({
      typeSeatchTerm: term
    });
    this.filterList(this.state.searchTerm, term);
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
          <div id="select">
            <ActivityTypeSelect 
              filterByType={this.filetByType} />
          </div>
          <div id="search">
            <SearchActivities 
              filter={this.filetBySearch} />
          </div>
        </div>
        
        <DataGrid rows={this.state.filteredActivities} 
                  columns={columns}  
                  pageSize={10}
                  fullwidth
                  autoHeight
                  autoWidth/>
      </div>
    );
  }
}

export default ManageActivities;