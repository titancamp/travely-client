import React from "react";

import HotelIcon from "@material-ui/icons/Hotel";
import Button from "@material-ui/core/Button";

import SaveHotel from "./save-hotel/save-hotel";

export default class ManageHotels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSaveHotelModalOpen: false,
    };

    this.handleSaveHotelModalToggle = this.handleSaveHotelModalToggle.bind(
      this
    );
  }

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
      </div>
    );
  }
}
