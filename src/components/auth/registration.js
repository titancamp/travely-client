import React, { useState } from "react";
import LoginLayout from "../common/login-layout";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Box } from "@material-ui/core";
import { useStyles } from './auth-style';

import { AuthContext } from "../../context";

const Registration = () => {
  const classes = useStyles();
  const [componentState, setComponentState] = useState({
    agencyName: '',
    email: '',
    password: '',
    conformPassword: '',
  });

  const handleChange = (prop) => (event) => {
    setComponentState({ [prop]: event.target.value });
  };

  return (
    <AuthContext.Consumer>
      {({ login }) => {
        return (
          <LoginLayout>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="agencyName"
                label="Travel agency name"
                name="agencyName"
                autoFocus
                onChange={handleChange("agencyName")}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Admin Email"
                name="email"
                autoComplete="email"
                onChange={handleChange("email")}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange("password")}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="conformPassword"
                label="Repeat Password"
                type="password"
                id="conformPassword"
                autoComplete="current-password"
                onChange={handleChange("conformPassword")}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register my agency
              </Button>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </LoginLayout>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Registration;