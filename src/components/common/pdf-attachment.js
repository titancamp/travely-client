import React from 'react';
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const PdfAttachment = (props) => {
    return (
        <Box>
            <Link
                target='_blank'
                href={props.filePath}
                style={{textDecoration: 'none', color: 'red'}}
            >
                <PictureAsPdf/>
                <span>{props.name}</span>
            </Link>
        </Box>
    );
};

export default PdfAttachment;