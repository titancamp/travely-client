import React from "react";
import RoomIcon from "@material-ui/icons/Room";
import Box from "@material-ui/core/Box";
import Popup from "./popup";
import Map from "./map";

class ShowOnMap extends React.Component {
  constructor() {
    super();
    this.state = { openPopup: false };
  }

  setOpenPopup = () => {
    const { openPopup } = this.state;
    this.setState({ openPopup: !openPopup });
  };

  render() {
    return (
      <div>
        <Box
          style={{ color: "blue", textDecoration: "none" }}
          display={"flex"}
          alignItems={"center"}
          onClick={() => {
            this.setState({ openPopup: true });
          }}
        >
          <RoomIcon />
          <span>Show on map</span>
        </Box>
        <Popup
          title={this.props.address}
          openPopup={this.state.openPopup}
          setOpenPopup={this.setOpenPopup}
        >
          <Map
            latitude={this.props.latitude}
            longitude={this.props.longitude}
            address={this.props.address}
          />
        </Popup>
      </div>
    );
  }
}

export default ShowOnMap;
