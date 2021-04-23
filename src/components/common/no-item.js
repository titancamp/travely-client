import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const NoItem = ({ singularItemName, pluralItemName, startIcon, onAddNewItem }) => {
  const StartIcon = startIcon;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      style={{ marginTop: "100px" }}
    >
      <Typography paragraph>
        You haven't added any {pluralItemName} yet.
      </Typography>
      <Button
        variant="contained"
        color="default"
        startIcon={<StartIcon />}
        onClick={onAddNewItem}
      >
        Add new {singularItemName}
      </Button>
    </Box>
  );
};

export default NoItem;
