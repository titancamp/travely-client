import React from 'react';
import Address from "../../common/address";

const AddressColumn = address =>
    <Address
        address={address.value}
        latitude={address.row.latitude}
        longitude={address.row.longitude}
    />;

export default AddressColumn;