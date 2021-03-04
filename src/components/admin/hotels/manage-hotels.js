import React from 'react';

import HotelIcon from '@material-ui/icons/Hotel';
import Button from '@material-ui/core/Button';

import AddHotel from './add-hotel';

export default class ManageHotels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddHotelModalOpen: false,
    };

    this.handleAddHotelModalToggle = this.handleAddHotelModalToggle.bind(this);
  }

  handleAddHotelModalToggle() {
    this.setState(state => ({
      isAddHotelModalOpen: !state.isAddHotelModalOpen
    }));
  }

  render() {
    return (
      <div>
        <Button variant="outlined" startIcon={<HotelIcon />} onClick={this.handleAddHotelModalToggle}>Add new hotel</Button>
        <AddHotel isOpen={this.state.isAddHotelModalOpen} handleAddHotelModalToggle={this.handleAddHotelModalToggle} />
      </div>
    );
  }
}
