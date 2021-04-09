import React from "react";

import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import { makeStyles } from "@material-ui/core/styles";

const Logo = ({ pages }) => {
  const classes = useStyles();

  return (
    <AirplanemodeActiveIcon className={classes.logo} />
  );
};

// styles
const useStyles = makeStyles((theme) => ({
  logo: {
    fontSize: "32px",
    transform: "rotate(45deg)",
    display: "inline-block",
    "-webkit-transform": "rotate(45deg)",
    "-moz-transform": "rotate(45deg)",
    "-ms-transform": "rotate(45deg)",
    "-o-transform": "rotate(45deg)",
  },
}));

export default Logo