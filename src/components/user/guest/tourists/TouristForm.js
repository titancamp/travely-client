import React from "react";
import Grid from "@material-ui/core/Grid";
import DateMonthPicker from "./component/DateMonthPicker";
import { convertMonthFormat } from "./component/DateFormats";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import * as yup from "yup";

const TouristsValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),

  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),

  phone: yup
    .string()
    .required("This field is required")
    .matches(
      /^[+]{1}374{1}[0-9]{8}$/,
      "Country calling code is +374 followed by 8 digits."
    ),
  email: yup.string().email("Email is not valid"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      width: "40",
      margin: theme.spacing(1),
    },
  },
}));

export default function TouristForm(props) {
  const classes = useStyles();
  const { addOrEdit, recordForEdit } = props;

  return (
    <Formik
      initialValues={
        recordForEdit != null
          ? recordForEdit
          : {
              id: 0,
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              placeBirth: "",
              birthDate: convertMonthFormat(new Date()),
              issueDate: convertMonthFormat(new Date()),
              expireDate: convertMonthFormat(new Date()),
              passportNum: "",
              issuedBy: "",
              notes: "",
            }
      }
      validationSchema={TouristsValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        addOrEdit(values);
        setSubmitting(false);
      }}
    >
      {(
        { values, errors, handleChange, handleSubmit, resetForm },
        resetAll = () => {
          resetForm({
            values: {
              id: values["id"],
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              placeBirth: "",
              birthDate: convertMonthFormat(new Date()),
              issueDate: convertMonthFormat(new Date()),
              expireDate: convertMonthFormat(new Date()),
              passportNum: "",
              issuedBy: "",
              notes: "",
            },
          });
        }
      ) => (
        <form
          className={classes.root}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Grid container>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                value={values.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />

              <TextField
                name="phone"
                label="Phone"
                variant="outlined"
                value={values.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />

              <DateMonthPicker
                name="birthDate"
                label="Date of birth"
                value={values.birthDate}
                onChange={handleChange}
                disableFuture="true"
              />
              <TextField
                name="passportNum"
                label="Passport Number"
                variant="outlined"
                value={values.passportNum}
                onChange={handleChange}
              />
              <DateMonthPicker
                name="issueDate"
                label="Issue Date"
                value={values.issueDate}
                onChange={handleChange}
                disableFuture={false}
              />
              <TextField
                name="notes"
                label="Notes"
                variant="outlined"
                value={values.notes}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                value={values.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                name="placeBirth"
                label="Place of birth"
                variant="outlined"
                value={values.placeBirth}
                onChange={handleChange}
              />
              <TextField
                name="issuedBy"
                label="Issued by"
                variant="outlined"
                value={values.issuedBy}
                onChange={handleChange}
              />
              <DateMonthPicker
                name="expireDate"
                label="Expire Date"
                value={values.expireDate}
                onChange={handleChange}
                disableFuture={false}
              />

              <div>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button color="default" onClick={resetAll} variant="contained">
                  Reset
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
