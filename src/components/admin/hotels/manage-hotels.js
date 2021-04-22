import React from "react";
import Button from "@material-ui/core/Button";
import HotelIcon from "@material-ui/icons/Hotel";
import { DataGrid } from "@material-ui/data-grid";
import { AuthContext, ManageHotelContext } from "../../../store/context";
import ACTION_TYPES from "../../../utils/datatable-row-action-types";
import NoItem from "../../common/no-item";
import Loading from "../../common/loading";
import SearchPlugin from "../../common/search-plugin";
import { columns } from "./manage-hotels-constants";
import HotelClient from '../../../api/hotel-client';
import SaveHotel from './save-hotel/save-hotel';
import ConfirmDialog from "../../user/guest/tourists/component/ConfirmDialog";

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
        this.deleteRow = this.deleteRow.bind(this);
        this.resetDeleteRowDialog = this.resetDeleteRowDialog.bind(this);
    }

    componentDidMount() {
        this.updateHotelsGrid();
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

        this.setState({ filteredList });
    };

    handleRowAction = (actionType, rowData) => {
        switch (actionType) {
            case ACTION_TYPES.EDIT:
                this.editRow(rowData.id);
                break;
            case ACTION_TYPES.DELETE:
                this.confirmDeleteRow(rowData.id);
                break;
            default:
                console.log("Implementation missing for action type " + actionType);
                break;
        }
    }

    editRow = (hotelId) => {
        this.setState({
            isLoading: true,
        });

        HotelClient.getHotelById(hotelId)
            .then(hotel => {
                this.setState({
                    isLoading: false,
                    isSaveHotelModalOpen: true,
                    hotelToEdit: hotel
                });
            })
            .catch(err => this.setState({
                isLoading: false,
            }));
    };

    confirmDeleteRow = (id) => {
        this.setState({
            isConfirmDialogOpen: true,
            hotelIdToDelete: id
        });
    }

    deleteRow = () => {
        this.setState({
            isLoading: true,
        });

        HotelClient.deleteHotel(this.state.hotelIdToDelete)
            .finally(() => {
                this.setState({
                    searchTerm: "",
                    isLoading: false,
                });
                this.resetDeleteRowDialog();
                this.updateHotelsGrid();
            });
    }

    resetDeleteRowDialog = () => {
        this.setState({
            isConfirmDialogOpen: false,
            hotelIdToDelete: null
        });
    }

    handleSaveHotelModalToggle() {
        this.setState((state) => ({
            isSaveHotelModalOpen: !state.isSaveHotelModalOpen,
            hotelToEdit: state.isSaveHotelModalOpen ? null : state.hotelToEdit
        }));

        this.updateHotelsGrid();
    }

    async updateHotelsGrid() {
        this.setState({
            isLoading: true,
        });

        await HotelClient.getHotels()
            .then((result) => {
                this.setState({
                    hotelsRows: result,
                    filteredList: result,
                    isLoading: false,
                });
            });
    }

    render() {
        return (
            <AuthContext.Consumer>
                {({ agencyId }) => {
                    return (
                        <div>
                            {this.state.isLoading
                                ? <Loading />
                                : this.state.hotelsRows.length === 0
                                    ? (<div>
                                        <NoItem
                                            singularItemName="hotel"
                                            pluralItemName="hotels"
                                            startIcon={HotelIcon}
                                            onAddNewItem={this.handleSaveHotelModalToggle}
                                        />
                                    </div>
                                    )
                                    : (<div>
                                        <Button
                                            variant="outlined"
                                            startIcon={<HotelIcon />}
                                            onClick={this.handleSaveHotelModalToggle}
                                        >
                                            Add new hotel
                                        </Button>
                                        <SearchPlugin
                                            searchTerm={this.state.searchTerm}
                                            updateSearchTerm={this.updateSearchTerm}
                                            placeholder={"Search hotels by name, contact or address"}
                                        />
                                        <div>
                                            <div>
                                                <ManageHotelContext.Provider value={{ onRowAction: this.handleRowAction }}>
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
                            {this.state.isSaveHotelModalOpen
                                ? <SaveHotel
                                    isOpen={this.state.isSaveHotelModalOpen}
                                    handleSaveHotelModalToggle={this.handleSaveHotelModalToggle}
                                    agencyId={agencyId || 0}
                                    hotelModel={this.state.hotelToEdit}
                                />
                                : null}
                            <ConfirmDialog title={"Are you sure you want to delete the hotel"}
                                isOpen={this.state.isConfirmDialogOpen}
                                onConfirm={this.deleteRow}
                                onCancel={this.resetDeleteRowDialog} />
                        </div>
                    )
                }
                }
            </AuthContext.Consumer>
        );
    }

}
