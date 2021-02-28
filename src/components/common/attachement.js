import React from 'react';
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import PhotoIcon from "@material-ui/icons/Photo";
import DescriptionIcon from "@material-ui/icons/Description";
import Box from "@material-ui/core/Box";

const Attachment = (props) => {
    let icon, color;

    switch (props.extension) {
        case 'pdf':
            icon = <PictureAsPdf/>;
            color = 'red';
            break;
        case 'img':
        case 'png':
        case 'jpg':
            icon = <PhotoIcon/>;
            color = 'inherit';
            break;
        default:
            icon = <DescriptionIcon/>;
            color = 'blue';
    }

    return (
        <Box target={'_blank'}
             href={props.filePath}
             style={{color: color, textDecoration: 'none'}}
             component={'a'}
             display={'flex'}
             alignItems={'center'}
        >
            {icon}
            <span>{props.name}</span>
        </Box>
    );
}
export default Attachment;