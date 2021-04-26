import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const FormikInputField = ({ variant = "outlined", ...props }) => {
  const [field, meta] = useField(props);
  const id = `input-${props.name || "outlined-basic"}`;
  return (
    <>
      <TextField {...field} {...props} id={id} variant={variant} />
      {meta.touched && meta.error ? (
        <Box color="error.main">{meta.error}</Box>
      ) : null}
    </>
  );
};

export default FormikInputField;
