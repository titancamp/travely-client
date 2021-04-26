import React from "react";
import DescriptionIcon from "@material-ui/icons/Description";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  attachmentLink: {
    textDecoration: "none",
    color: "blue",
    cursor: "pointer",
  },
});

const FileAttachment = (props) => {
  const classes = useStyles();
  return (
    <Box m={0.5}>
      <Link
        target="_blank"
        href={props.filePath}
        className={classes.attachmentLink}
        style={{ textDecoration: "none" }}
      >
        <DescriptionIcon />
        <span>{props.name}</span>
      </Link>
    </Box>
  );
};

export default FileAttachment;
