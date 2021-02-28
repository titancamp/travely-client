import React from 'react';
import RoomIcon from "@material-ui/icons/Room";
import Box from "@material-ui/core/Box";

const ShowOnMap = () => {
        return <Box
            target={'_blank'}
            href={'https://www.google.com/maps/'} //
            style={{color: 'blue', textDecoration: 'none'}}
            component={'a'}
            display={'flex'}
            alignItems={'center'}>
            <RoomIcon/>
            <span>Show on map</span>
        </Box>;
    }
;

export default ShowOnMap;