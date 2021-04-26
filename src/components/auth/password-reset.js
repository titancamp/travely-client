import React from "react";
import { useHistory } from "react-router-dom";

import { Formik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import LoginLayout from "../common/login-layout";
import AuthClient from "../../api/auth-client";
import { useStyles } from "./auth-style";

import FormikInputField from "../UI/FormikComponents/FormikInputField";

const PasswordResetSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password should be not less then 6 character")
    .required("Password is required"),
  conformPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Repeat Password is required"),
});

const PasswordReset = () => {
  const classes = useStyles();
  const history = useHistory();
  const token = new URLSearchParams(history.location.search).get("token");

  const onSubmit = (values, { setSubmitting, setErrors }) => {
    AuthClient.resetPassword({
      token,
      password: values.password,
      conformPassword: values.conformPassword,
    })
      .then((result) => {
        history.push("/login");
      })
      .catch((error) => {
        if (error.response && error.response.status) {
          setErrors({
            message: "There was error on password reset",
          });
        } else {
          setErrors({
            message: "Server is unreachable",
          });
        }
        setSubmitting(false);
      });
  };

  return (
    <LoginLayout>
      <Formik
        initialValues={{ password: "", conformPassword: "", message: "" }}
        validationSchema={PasswordResetSchema}
        onSubmit={onSubmit}
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
            <FormikInputField
              margin="normal"
              required
              fullWidth
              name="password"
              value={values.password}
              label="Enter a new Password"
              type="password"
              id="password"
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormikInputField
              margin="normal"
              required
              fullWidth
              name="conformPassword"
              value={values.conformPassword}
              label="Repeat the new Password"
              type="password"
              id="conformPassword"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Box display={values.message ? "none" : ""} color="error.main">
              {errors.message && errors.message}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              Set my new password
            </Button>
          </form>
        )}
      </Formik>
    </LoginLayout>
  );
};

export default PasswordReset;
