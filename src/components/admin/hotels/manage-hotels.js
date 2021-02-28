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

    render() {
        return (
            this.state.hotelsRows.length === 0 ?
                <NoItem
                    singularItemName={'hotel'}
                    pluralItemName={'hotels'}
                    addNewItem={() => console.log('Added new item.')}/>
                :
                <div>
                    <SearchPlugin filter={this.filterList}/>
                    <div style={{height: 500, width: '100%'}}>
                        <DataGrid
                            rows={this.state.filteredList}
                            columns={columns}
                            pageSize={7}
                            fullwidth
                        />
                    </div>
                </div>
        );
    }
}

export default ManageHotels;







