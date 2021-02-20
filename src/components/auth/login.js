import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../../store/context";

export default class Login extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ login }) => {
          return (
            <div>
              <Typography paragraph>
                The 'Login' Page comming soon...
              </Typography>
              <Button variant="contained" onClick={login}>
                <Link to="/admin">Login to admin area</Link>
              </Button>
              <Button variant="contained" onClick={login}>
                <Link to="/user">Login to user area</Link>
              </Button>
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
