import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import LoginLayout from "../common/login-layout";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Box } from "@material-ui/core";
import { useStyles } from './auth-style';
import FormikInputField from "../UI/FormikComponents/FormikInputField";

import { AuthContext } from "../../store/context";

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [componentState, setComponentState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setComponentState({ [prop]: event.target.value });
  };

  const handleClick = (login) => {
    login(true, "string", "a@a.a");
    history.push('/admin/');
  }

  return (
    <AuthContext.Consumer>
      {({ login }) => {
        return (
          <LoginLayout>
            <form className={classes.form} noValidate>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item>
                  <Box>
                    {"Don't have an account?"}
                  </Box>
                </Grid>
                <Grid item>
                  <Link href="/registration" variant="body2">
                    {"Register your travel agency here"}
                  </Link>
                </Grid>
              </Grid>
              <FormikInputField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange("email")}
              />
              <FormikInputField
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => { handleClick(login) }}
              >
                Sign In
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

export default Login;