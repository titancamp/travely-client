import React from "react";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import Box from "@material-ui/core/Box";

const PdfAttachment = (props) => {
  return (
    <Box
      target={"_blank"}
      href={props.filePath}
      style={{ textDecoration: "none" }}
      color={"red"}
      component={"a"}
      display={"flex"}
      alignItems={"center"}
    >
      <PictureAsPdf />
      <span>{props.name}</span>
    </Box>
  );
};

export default PdfAttachment;
