import React from "react";
import DescriptionIcon from "@material-ui/icons/Description";
import Box from "@material-ui/core/Box";

const FileAttachment = (props) => {
  return (
    <Box
      target={"_blank"}
      href={props.filePath}
      style={{ textDecoration: "none" }}
      color={"blue"}
      component={"a"}
      display={"flex"}
      alignItems={"center"}
    >
      <DescriptionIcon />
      <span>{props.name}</span>
    </Box>
  );
};

export default FileAttachment;
