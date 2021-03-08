import React, { useCallback, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateMonthPicker from "./component/DateMonthPicker";
import { convertMonthFormat } from "./component/DateFormats";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => (
    {
      root: {
        "& .MuiInputBase-root": {
          width: "40",
          margin: theme.spacing(1)
        }
      }
    }
  )
);

const initialFormValues = {
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
  notes: ""
};

export default function TouristForm(props) {

  const classes = useStyles();
  const { addOrEdit, recordForEdit } = props;
  const validate = () => {
    let temp = {};

    temp.firstName = values.firstName ? "" : "This field is required";
    temp.lastName = values.lastName ? "" : "This field is required";
    temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is not valid";
    temp.phone = values.phone.length > 9 ? "" : "Minimum 10 numbers required";
    setErrors({
      ...temp
    });

    return Object.values(temp).every(x => x == "");

  };

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback(e => {

    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value

    });
  });
  const resetForm = () => {
    setValues(initialFormValues);
    setErrors({});
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit
      });
  }, [recordForEdit]);

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">

      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            value={values.firstName}
            onChange={handleInputChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />

          <TextField
            name="phone"
            label="Phone"
            variant="outlined"
            value={values.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />

          <DateMonthPicker
            name="birthDate"
            label="Date of birth"
            value={values.birthDate}
            onChange={handleInputChange}
            disableFuture="true"
          />
          <TextField
            name="passportNum"
            label="Passport Number"
            variant="outlined"
            value={values.passportNum}
            onChange={handleInputChange}
          />
          <DateMonthPicker
            name="issueDate"
            label="Issue Date"
            value={values.issueDate}
            onChange={handleInputChange}
            disableFuture={false}
          />
          <TextField
            name="notes"
            label="Notes"
            variant="outlined"
            value={values.notes}
            onChange={handleInputChange}
          />

        </Grid>
        <Grid item xs={6}>

          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            value={values.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            name="placeBirth"
            label="Place of birth"
            variant="outlined"
            value={values.placeBirth}
            onChange={handleInputChange}
          />
          <TextField
            name="issuedBy"
            label="Issued by"
            variant="outlined"
            value={values.issuedBy}
            onChange={handleInputChange}
          />
          <DateMonthPicker
            name="expireDate"
            label="Expire Date"
            value={values.expireDate}
            onChange={handleInputChange}
            disableFuture={false}
          />

          <div>
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >Submit</Button>
            <Button
              color="default"
              onClick={resetForm}
              variant="contained"
            >Reset</Button>
          </div>
        </Grid>

      </Grid>

    </form>
  );
}