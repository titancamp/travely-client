import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import HotelIcon from "@material-ui/icons/Hotel";
import Box from "@material-ui/core/Box";

const NoItem = (props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      style={{ marginTop: "100px" }}
    >
      <Typography paragraph>
        You haven't added any {props.pluralItemName} yet.
      </Typography>
      <Button
        variant="contained"
        color="default"
        startIcon={<HotelIcon />}
        onClick={props.addNewItem}
      >
        Add new {props.singularItemName}
      </Button>
    </Box>
  );
};

export default NoItem;
