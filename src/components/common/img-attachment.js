import React from "react";
import PhotoIcon from "@material-ui/icons/Photo";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  attachmentLink: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
});

const ImgAttachment = (props) => {
  const classes = useStyles();

  return (
    <Box m={0.5}>
      <Link
        target="_blank"
        href={props.filePath}
        className={classes.attachmentLink}
        style={{ textDecoration: "none" }}
      >
        <PhotoIcon />
        <span>{props.name}</span>
      </Link>
    </Box>
  );
};

export default ImgAttachment;
