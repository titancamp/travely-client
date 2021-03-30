import React from "react";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    attachmentLink: {
        color: "red",
        cursor: "pointer",
        textDecoration: "none",
    }
});

const PdfAttachment = (props) => {
    const classes = useStyles();

    return (
        <Box m={0.5}>
            <Link
                target="_blank"
                href={props.filePath}
                className={classes.attachmentLink}
                style={{textDecoration: "none"}}
            >
                <PictureAsPdf/>
                <span>{props.name}</span>
            </Link>
        </Box>
    );
};

export default PdfAttachment;
