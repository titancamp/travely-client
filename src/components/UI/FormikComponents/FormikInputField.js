import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";

const FormikInputField = ({ variant = "outlined", ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField {...field} {...props} id="outlined-basic" variant={variant} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default FormikInputField;
