import React from "react";
import PictureAsPdf from "@material-ui/icons/PictureAsPdf";
import PhotoIcon from "@material-ui/icons/Photo";
import DescriptionIcon from "@material-ui/icons/Description";
import Link from "react-router-dom/modules/Link";
import Box from "@material-ui/core/Box";

const Attachment = (props) => {
  let icon, color;

  switch (props.extension) {
    case "pdf":
      icon = <PictureAsPdf />;
      color = "red";
      break;
    case "img":
    case "png":
    case "jpg":
      icon = <PhotoIcon />;
      color = "inherit";
      break;
    default:
      icon = <DescriptionIcon />;
      color = "blue";
  }

  return (
    <Box>
      <Link
        target="_blank"
        to={props.filePath}
        style={{ color: color, textDecoration: "none" }}
      >
        {icon}
        <span>{props.name}</span>
      </Link>
    </Box>
  );
};

export default Attachment;
