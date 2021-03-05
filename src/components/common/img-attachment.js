import React from 'react';
import PhotoIcon from "@material-ui/icons/Photo";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const ImgAttachment = (props) => {
    return (
        <Box>
            <Link
                target='_blank'
                to={props.filePath}
                style={{textDecoration: 'none', color: 'inherit'}}
            >
                <PhotoIcon/>
                <span>{props.name}</span>
            </Link>
        </Box>
    );
};

export default ImgAttachment;