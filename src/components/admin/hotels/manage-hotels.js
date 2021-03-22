import React from "react";

import HotelIcon from "@material-ui/icons/Hotel";
import Button from "@material-ui/core/Button";

import SaveHotel from "./save-hotel/save-hotel";
import { columns } from "./manage-hotels-constants";
import NoItem from "../../common/no-item";
import SearchPlugin from "../../common/search-plugin";
import { DataGrid } from "@material-ui/data-grid";
import HotelClient from "../../../api/hotel-client";

export default class ManageHotels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaveHotelModalOpen: false,
      hotelsRows: [],
      filteredList: [],
      searchTerm: "",
    };

    this.handleSaveHotelModalToggle = this.handleSaveHotelModalToggle.bind(
      this
    );
  }

  componentDidMount() {
    HotelClient.getHotels()
      .then(hotels => {
        this.setState({
          hotelsRows: hotels,
          filteredList: hotels,
        });
      });
  }

  filterList = (searchTherm) => {
    const term = searchTherm.toLowerCase();

    const filteredList = this.state.hotelsRows.filter(
      (e) =>
        e.name.toLowerCase().includes(term) ||
        e.address.toLowerCase().includes(term) ||
        e.contactName.toLowerCase().includes(term)
    );

    this.setState({ filteredList });
  };

  handleSaveHotelModalToggle() {
    this.setState((state) => ({
      isSaveHotelModalOpen: !state.isSaveHotelModalOpen,
    }));
  }

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          startIcon={<HotelIcon />}
          onClick={this.handleSaveHotelModalToggle}
        >
          Add new hotel
        </Button>
        <SaveHotel
          isOpen={this.state.isSaveHotelModalOpen}
          handleSaveHotelModalToggle={this.handleSaveHotelModalToggle}
        />
        {this.state.hotelsRows.length === 0 ? (
          <NoItem
            singularItemName="hotel"
            pluralItemName="hotels"
            addNewItem={this.addNewItem}
          />
        ) : (
          <div>
            <SearchPlugin
              filter={this.filterList}
              placeholder={"Search hotels by name, contact or address"}
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
        )}
      </div>
    );
  }
}
