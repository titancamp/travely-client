import React, { useCallback } from "react";

import { Formik } from "formik";
import * as yup from "yup";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormikInputField from "../../UI/FormikComponents/FormikInputField";

import StaffClient from "../../../api/staff-client";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter member first name")
    .required("Staff member first name is required"),
  lastName: yup
    .string("Enter member last name")
    .required("Staff member last name is required"),
  title: yup.string("Enter title"),
  email: yup
    .string("Enter email")
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string("Enter phone"),
});

const StaffForm = ({
  isOpen,
  handleModalToggle,
  staffModel,
  onClose,
  onSave,
}) => {
  const isEditForm = Boolean(staffModel && staffModel.id);
  const dialogTitle = isEditForm ? "Edit staff" : "Add new staff";

  let initialValues;

  if (staffModel) {
    initialValues = {
      ...staffModel,
      title: staffModel.jobTitle,
    };
  } else {
    initialValues = {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phoneNumber: "",
      password: "",
    };
  }

  const handleClose = useCallback(() => {
    handleModalToggle();
    onClose && onClose();
  }, [handleModalToggle, onClose]);

  const onReset = useCallback(() => {
    handleModalToggle();
    onClose && onClose();
  }, [handleModalToggle, onClose]);

  const onSubmit = async (model, formikHelper) => {
    isEditForm
      ? await StaffClient.update(model.id, model)
      : await StaffClient.create(model);

    if (!isEditForm) {
      formikHelper.resetForm();
    }
    // StaffClient.getAll();
    onSave();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
      }) => {

        return (
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Dialog
              open={isOpen}
              onClose={handleClose}
              fullWidth
              maxWidth="xs"
              aria-labelledby="alert-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
              <DialogContent>
                <FormikInputField
                  margin="dense"
                  required
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First name"
                  value={values.firstName}
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormikInputField
                  margin="dense"
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  value={values.lastName}
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormikInputField
                  margin="dense"
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={values.title}
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <FormikInputField
                  margin="dense"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!isEditForm && (
                  <FormikInputField
                    type="password"
                    margin="dense"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    value={values.password}
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                )}
                <FormikInputField
                  margin="dense"
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone"
                  value={values.phoneNumber}
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <ButtonGroup fullWidth>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Save
                  </Button>
                  <Button
                    type="reset"
                    onClick={handleReset}
                    disabled={isSubmitting}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
};

export default StaffForm;
