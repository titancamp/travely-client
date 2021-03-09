import React, { useState } from "react";
import LoginLayout from "../common/login-layout";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Box } from "@material-ui/core";
import { useStyles } from './auth-style';

const PasswordReset = () => {
  const classes = useStyles();
  const [componentState, setComponentState] = useState({
    password: '',
    conformPpassword: '',
  });

  const handleChange = (prop) => (event) => {
    setComponentState({ [prop]: event.target.value });
  };

  return (
    <LoginLayout>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Enter a new Password"
          type="password"
          id="password"
          autoFocus
          onChange={handleChange("password")}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="conformPpassword"
          label="Repeat the new Password"
          type="password"
          id="conformPpassword"
          onChange={handleChange("conformPpassword")}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Set my new password
        </Button>
      </form>
    </LoginLayout>
  );
};

export default PasswordReset;