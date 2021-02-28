import React from "react";
import { Box } from "@material-ui/core/Box";
import { ReactComponent as Logo } from "../../logo.svg";

export default class LoginLayout extends React.Component {
  // constructor() {
  //   super();

  // }

  render() {
      return (
      <Box>
        <Logo />
        {this.props.children}
      </Box>
    );
  }
};