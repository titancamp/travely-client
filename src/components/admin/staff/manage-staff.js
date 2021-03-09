// import React from "react";
// import { DataGrid } from '@material-ui/data-grid';
// import { dummyData, columns } from './manage-staff-const'
// import './manage-staff.css'

// class ManageStaff extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {
//           staffRows: [],
//           filteredStaff: [],
//           searchTerm: '',
//       };

//       this.filetBySearch = this.filetBySearch.bind(this);
//       this.filetByType = this.filetByType.bind(this);
//       this.filterList = this.filterList.bind(this);
//   }

//     componentDidMount() {
//       const activityRows = dummyData;

//       this.setState({
//         activityRows: activityRows,
//         filteredActivities: activityRows
//       });
//   }

//   filetBySearch =(term) => {
//     this.setState({
//       searchTerm: term
//     });
//     this.filterList(term, this.state.typeSeatchTerm);
//   }

//   filterList = (searchTerm, searchByTypeterm) => {
//     const filteredActivities = this.state.activityRows.filter(e =>
//         (searchTerm === ''
//           || e.name.toLowerCase().includes(searchTerm.toLowerCase()) 
//           || e.address.toLowerCase().includes(searchTerm.toLowerCase())  
//         )
//         && 
//         (searchByTypeterm ==='' 
//           || e.type.toLowerCase().includes(searchByTypeterm.toLowerCase()) 
//         )
//       );
//     this.setState({filteredActivities});
//   };

//   render(){
//     return (
//       <div>
//         <div id="search_bar">
//           {/* <div id="search">
//             <SearchActivities 
//               filter={this.filetBySearch} />
//           </div> */}
//         </div>

//         <DataGrid rows={this.state.filteredStaff} 
//                   columns={columns}  
//                   pageSize={10}
//                   fullwidth
//                   autoHeight
//                   autoWidth/>
//       </div>
//     );
//   }
// };

// export default ManageStaff;

import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ManageStaff() {
  return (
    <Typography paragraph>
      The 'Manage Staff' Page comming soon...
    </Typography>
  );
}