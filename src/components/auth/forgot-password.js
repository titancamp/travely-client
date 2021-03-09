import React, { useState } from "react";
import LoginLayout from "../common/login-layout";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './auth-style';

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState(null);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <LoginLayout>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset Password
        </Button>
      </form>
    </LoginLayout>
  );
}

export default ForgotPassword;
