import React from 'react';
import Box from "@material-ui/core/Box";
import ShowOnMap from "./show-on-map";

const Address = (props) => {
    return (
        <Box
            display={'flex'}
            alignItems={'center'}>
            <span>{props.address}</span>
            <ShowOnMap latitude={props.latitude} longitude={props.longitude}/>
        </Box>
    );
};

export default Address;