import React from 'react';
import {DataGrid} from '@material-ui/data-grid'
import NoItem from '../../common/no-item';
import SearchPlugin from '../../common/search-plugin';
import {seedData, columns} from './manage-hotels-constants';

class ManageHotels extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hotelsRows: [],
            filteredList: [],
            searchTerm: ''
        };
    }

    componentDidMount() {
        // getting data from API
        const hotelsRows = seedData;

        this.setState({
            hotelsRows: hotelsRows,
            filteredList: hotelsRows
        });
    }

    filterList = (searchTherm) => {
        const term = searchTherm.toLowerCase();

        const filteredList = this.state.hotelsRows.filter(e =>
            e.name.toLowerCase().includes(term) ||
            e.address.toLowerCase().includes(term) ||
            e.contactName.toLowerCase().includes((term)));

        this.setState({filteredList});
    };

    addNewItem=()=>{
        console.log('Added new item.')
    };

    render() {
        return (
            this.state.hotelsRows.length === 0 ?
                <NoItem
                    singularItemName='hotel'
                    pluralItemName='hotels'
                    addNewItem={this.addNewItem}
                />
                :
                <div>
                    <SearchPlugin
                        filter={this.filterList}
                        placeholder={'Search hotels by name, contact or address'}
                    />
                    <div>
                        <div>
                            <DataGrid
                                disableColumnResize={true}
                                rows={this.state.filteredList}
                                columns={columns}
                                pageSize={9}
                                fullwidth
                                autoHeight
                                autoWidth
                            />
                        </div>
                    </div>
                </div>
        );
    }
}

export default ManageHotels;







