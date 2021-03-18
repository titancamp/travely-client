import React from "react";
import PhotoIcon from "@material-ui/icons/Photo";
import Box from "@material-ui/core/Box";

const ImgAttachment = (props) => {
  return (
    <Box
      target={"_blank"}
      href={props.filePath}
      style={{ textDecoration: "none" }}
      component={"a"}
      display={"flex"}
      alignItems={"center"}
      color={"inherit"}
    >
      <PhotoIcon />
      <span>{props.name}</span>
    </Box>
  );
};

export default ImgAttachment;
