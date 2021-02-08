import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
    };

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    this.setState({
      isLoggedIn: true,
    });
  }

  render() {
    return (
      <div>
        <Typography paragraph>The 'Login' Page comming soon...</Typography>
        <Button
          variant="contained"
          onClick={this.authenticate}
        >
          <Link to="/admin">Login</Link>
        </Button>
        <Link
          to="/user"
          onClick={this.authenticate}
        >
          User
        </Link>
      </div>
    );
  }
}
