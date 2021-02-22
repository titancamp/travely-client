import React, { useEffect } from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import { Form, useForm } from "./component/useForm";
import Controls from "./component/controls/Controls";
import * as touristService from "./service/touristService";
import { convertMonthFormat } from "./component/controls/DateFormats";


const initialFormValues = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  placeBirth: "",
  agencyId: "",
  birthDate: convertMonthFormat(new Date()),
  issueDate: convertMonthFormat(new Date()),
  expireDate: convertMonthFormat(new Date()),
  passportNum: "",
  issuedBy: "",
  notes: ""
};

export default function TouristForm(props) {

  const { addOrEdit, recordForEdit } = props;
  const validate = () => {
    let temp = {};

    temp.firstName = values.firstName ? "" : "This field is required";
    temp.lastName = values.lastName ? "" : "This field is required";
    temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is not valid";
    temp.phone = values.phone.length > 9 ? "" : "Minimum 10 numbers required";
    temp.agencyId = (values.agencyId?.length !== 0) ? "" : "This field is required";
    setErrors({
      ...temp
    });

    return Object.values(temp).every(x => x == "");

  };


  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFormValues);

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
    <Form onSubmit={handleSubmit}>

      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
          <Controls.Input
            name="phone"
            label="Phone"
            value={values.phone}
            onChange={handleInputChange}
            error={errors.phone}
          />

          <Controls.DateMonthPicker
            name="birthDate"
            label="Date of birth"
            value={values.birthDate}
            onChange={handleInputChange}
            disableFuture="true"
          />
          <Controls.Input
            name="passportNum"
            label="Passport Number"
            value={values.passportNum}
            onChange={handleInputChange}
            error={errors.passportNum}
          />
          <Controls.DateMonthPicker
            name="issueDate"
            label="Issue Date"
            value={values.issueDate}
            onChange={handleInputChange}
            disableFuture={false}
          />
          <Controls.Input
            name="notes"
            label="Notes"
            value={values.notes}
            onChange={handleInputChange}
            error={errors.notes}
          />

        </Grid>
        <Grid item xs={6}>

          <Controls.Input
            name="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />

          <Controls.Input
            name="placeBirth"
            label="Place of birth"
            value={values.placeBirth}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="issuedBy"
            label="Issued by"
            value={values.issuedBy}
            onChange={handleInputChange}
            error={errors.issuedBy}
          />
          <Controls.DateMonthPicker
            name="expireDate"
            label="Expire Date"
            value={values.expireDate}
            onChange={handleInputChange}
            disableFuture={false}
          />
          <Controls.Select
            name="agencyId"
            label="Agency"
            value={values.agencyId}
            onChange={handleInputChange}
            options={touristService.getAgencyCollection()}
            error={errors.agencyId}
          />


          <div>
            <Controls.Button
              type="submit"
              text="Submit"
            />
            <Controls.Button
              text="Reset"
              color="default"
              onClick={resetForm}
            />
          </div>
        </Grid>

      </Grid>

    </Form>
  );
}