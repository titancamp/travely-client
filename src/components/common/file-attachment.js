import React from "react";
import DescriptionIcon from "@material-ui/icons/Description";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

const FileAttachment = (props) => {
  return (
    <Box>
      <Link
        target="_blank"
        href={props.filePath}
        style={{ textDecoration: "none", color: "blue" }}
      >
        <DescriptionIcon />
        <span>{props.name}</span>
      </Link>
    </Box>
  );
};

export default FileAttachment;
