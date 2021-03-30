import React from "react";
import { useHistory } from 'react-router-dom';

import { Formik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import LoginLayout from "../common/login-layout";
import AuthClient from "../../api/auth-client"
import { useStyles } from './auth-style';

import FormikInputField from "../UI/FormikComponents/FormikInputField"

const RegisterSchema = yup.object().shape({
  agencyName: yup.string().min(6, "Agency Name should be not less then 6 character").required("Agency Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Password should be not less then 6 character").required("Password is required"),
  conformPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match").required('Repeat Password is required')
});

const Registration = () => {
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = (values, { setSubmitting, setErrors }) => {
    AuthClient.register({
      agencyName: values.agencyName,
      email: values.email,
      password: values.password,
    })
      .then((result) => {
        if (result.status === 200) {
          history.push({
            pathname: '/login',
            message: 'Agency has been successfully registered',
          });
        }
        else {
          setErrors({
            message: "There was error during registration",
          })
          setSubmitting(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status) {
          setErrors({
            message: "There was error during registration",
          })
        }
        else {
          setErrors({
            message: "Server is unreachable",
          })
        }
        setSubmitting(false);
      });
  };
  
  return (
    <LoginLayout>
      <Formik
        initialValues={{ agencyName: "", email: "", password: "", conformPassword: "", message: "" }}
        validationSchema={RegisterSchema}
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
            id="agencyName"
            label="Travel agency name"
            name="agencyName"
            value={values.agencyName}
            autoFocus
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormikInputField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Admin Email"
            name="email"
            value={values.email}
            autoComplete="email"
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
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormikInputField
            margin="normal"
            required
            fullWidth
            name="conformPassword"
            value={values.conformPassword}
            label="Repeat Password"
            type="password"
            id="conformPassword"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Box display={errors.message ? "" : "none"} color="error.main">
            {errors.message}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            Register my agency
          </Button>
        </form>
      )}
      </Formik>
    </LoginLayout>
  );
};

export default Registration;