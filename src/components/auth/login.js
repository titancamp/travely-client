import React from "react";
import { useHistory } from 'react-router-dom';

import { Formik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

import { AuthContext } from "../../store/context";
import LoginLayout from "../common/login-layout";
import AuthClient from "../../api/auth-client";
import AgencyClient from "../../api/agency-client";
import UserClient from "../../api/user-client";
import { useStyles } from './auth-style';

import FormikInputField from "../UI/FormikComponents/FormikInputField"

const LoginSchema = yup.object().shape({
  username: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = (props) => {
  console.log('props:', props);
  const classes = useStyles();
  const history = useHistory();

  const setError = (error, setErrors) => {
    if (error.response && error.response.status) {
      setErrors({
        message: "Email or password are incorrect",
      })
    }
    else {
      setErrors({
        message: "Server is unreachable",
      })
    }
  };

  return (
    <AuthContext.Consumer>
      {({ login }) => {
        return (
          <LoginLayout>
            <Formik
              initialValues={{ username: "", password: "", message: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                AuthClient.login(values.username, values.password)
                  .then((result) => {
                    if (result.status === 200) {
                      const expiresIn = new Date(Date.now() + (result.data.expires_in * 1000));
                      const data = {
                        loggedIn: true,
                        accessToken: result.data.access_token,
                        refreshToken: result.data.refresh_token,
                        expiresIn,
                        email: values.username,
                        role: null,
                      }
                      // TODO: make identity server to return role
                      AgencyClient.get(data.accessToken).then((result) => {
                        if (result.status === 200) {
                          UserClient.get(data.accessToken, result.data.ownerId).then((result) => {
                            if (result.status === 200) {
                              data.role = result.data.role;
                              login(data);
                              history.push(`/${data.role}/`);
                            }
                            else {
                              setErrors({ message: "Email or password are incorrect" })
                            }
                          })
                          .catch((error) => {
                            setError(error, setErrors);
                          });
                        }
                        else {
                          setErrors({ message: "Email or password are incorrect" })
                        }
                      })
                      .catch((error) => {
                        setError(error, setErrors);
                      });
                    }
                    else {
                      setErrors({ message: "Email or password are incorrect" })
                    }
                  })
                  .catch((error) => {
                    setError(error, setErrors);
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              }}
            >
            {({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
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
                  id="username"
                  label="Email Address"
                  name="username"
                  value={values.username}
                  autoComplete="email"
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormikInputField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={values.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <Box display={errors.message || props?.location?.message ? "" : "none"} color={errors.message ? "error.main" : "success.main" }>
                  {errors.message ? errors.message : props?.location?.message}
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
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
            )}
          </Formik>
          </LoginLayout>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Login;