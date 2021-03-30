import React from 'react';
import {CircularProgress} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const Loading = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <CircularProgress/>
        </Box>
    );
}

export default Loading;