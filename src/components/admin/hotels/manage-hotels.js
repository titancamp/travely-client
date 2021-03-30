import React from "react";
import {columns} from "./manage-hotels-constants";
import NoItem from "../../common/no-item";
import SearchPlugin from "../../common/search-plugin";
import {DataGrid} from "@material-ui/data-grid";
import {ManageHotelContext} from "../../../store/context";
import HotelClient from '../../../api/hotel-client';
import Loading from "../../common/loading";
import Button from "@material-ui/core/Button";
import HotelIcon from "@material-ui/icons/Hotel";
import SaveHotel from './save-hotel/save-hotel';

export default class ManageHotels extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSaveHotelModalOpen: false,
            isLoading: false,
            searchTerm: "",
            hotelsRows: [],
            filteredList: [],
        };

        this.handleSaveHotelModalToggle = this.handleSaveHotelModalToggle.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        });

        HotelClient.getHotels()
            .then((result) => {
                this.setState({
                    hotelsRows: result.data,
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

        const filteredList = this.state.hotelsRows.filter(
            (e) =>
                e.name.toLowerCase().includes(term) ||
                e.address.toLowerCase().includes(term) ||
                e.contactName.toLowerCase().includes(term)
        );

        this.setState({filteredList});
    };

    deleteRow = (id) => {
        this.setState({
            isLoading: true,
        });

        HotelClient.deleteHotel(id)
            .then((result) => {
                const hotelsRows = this.state.hotelsRows.filter(hotel => hotel.id !== id);
                this.setState({
                    hotelsRows: hotelsRows,
                    filteredList: hotelsRows,
                    searchTerm: "",
                    isLoading: false,
                });
            });
    }

    handleSaveHotelModalToggle() {
        this.setState((state) => ({
            isSaveHotelModalOpen: !state.isSaveHotelModalOpen,
        }));
    }

    render() {
        return (
            <div>
                {this.state.isLoading
                    ? <Loading/>
                    : this.state.hotelsRows.length === 0
                        ? (<div>
                                <NoItem
                                    singularItemName="hotel"
                                    pluralItemName="hotels"
                                    addNewItem={this.addNewItem}
                                />
                            </div>
                        )
                        : (<div>
                                <Button
                                    variant="outlined"
                                    startIcon={<HotelIcon/>}
                                    onClick={this.handleSaveHotelModalToggle}
                                >
                                    Add new hotel
                                </Button>
                                <SaveHotel
                                    isOpen={this.state.isSaveHotelModalOpen}
                                    handleSaveHotelModalToggle={this.handleSaveHotelModalToggle}
                                />
                                <SearchPlugin
                                    searchTerm={this.state.searchTerm}
                                    updateSearchTerm={this.updateSearchTerm}
                                    placeholder={"Search hotels by name, contact or address"}
                                />
                                <div>
                                    <div>
                                        <ManageHotelContext.Provider value={{deleteHandler: this.deleteRow}}>
                                            <DataGrid
                                                disableColumnResize={true}
                                                rows={this.state.filteredList}
                                                columns={columns}
                                                pageSize={9}
                                                fullwidth
                                                autoHeight
                                                autoWidth
                                            />
                                        </ManageHotelContext.Provider>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        );
    }

}
