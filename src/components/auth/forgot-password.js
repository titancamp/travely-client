import React, { useState } from "react";

import { Formik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import LoginLayout from "../common/login-layout";
import AuthClient from "../../api/auth-client";
import { useStyles } from "./auth-style";

import FormikInputField from "../UI/FormikComponents/FormikInputField";

const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");

  const onSubmit = (values, { setSubmitting, setErrors }) => {
    AuthClient.forgetPassword({ email: values.email })
      .then((result) => {
        setMessage("Check your inbox for instructions to reset your password");
      })
      .catch((error) => {
        if (error.response && error.response.status) {
          setErrors({
            message: "There was error during forgot password",
          });
        } else {
          setErrors({
            message: "Server is unreachable",
          });
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const getFormikHtml = () => {
    return (
      <Formik
        initialValues={{ email: "", message: "" }}
        validationSchema={ForgotPasswordSchema}
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
              id="email"
              label="Email Address"
              name="email"
              value={values.email}
              autoComplete="email"
              autoFocus
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
              Reset Password
            </Button>
          </form>
        )}
      </Formik>
    );
  };

  const getMessageHtml = () => {
    return (
      <div className={classes.form}>
        <Box color="text.primary">
          <h2>{message}</h2>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          href="/login"
        >
          Navigate to login page
        </Button>
      </div>
    );
  };

  return (
    <LoginLayout>
      {message === "" ? getFormikHtml() : getMessageHtml()}
    </LoginLayout>
  );
};

export default ForgotPassword;
