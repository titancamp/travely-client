import React from "react";
import ShowOnMap from "./show-on-map";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  addressDiv: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
});

const Address = (props) => {
  const address = props.value;
  const classes = useStyles();

  return (
    <div className={classes.addressDiv}>
      <span>{address}</span>
      <ShowOnMap
        latitude={props.row.latitude}
        longitude={props.row.longitude}
        address={address}
      />
    </div>
  );
};

export default Address;
