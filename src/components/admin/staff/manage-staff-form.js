import React from "react";

import { Formik } from "formik";
import * as yup from "yup";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GroupIcon from "@material-ui/icons/Group";

import FormikInputField from "../../UI/FormikComponents/FormikInputField"

import StaffClient from "../../../api/staff-client";

const validationSchema = yup.object({
  name: yup.string("Enter member name").required("Staff member name is required"),
  title: yup.string("Enter title"),
  email: yup.string("Enter email").email("Enter a valid email").required("Email is required"),
  phone: yup.string("Enter phone"),
});

const StaffForm = ({ isOpen, handleModalToggle, staffModel }) => {
  const isEditForm = Boolean(staffModel && staffModel.id);
  const dialogTitle = isEditForm ? "Edit staff" : "Add new staff";
  const initialValues = staffModel || {
    name: "",
    title: "",
    email: "",
    phone: "",
  };

  const handleClose = () => {
    handleModalToggle();
  };

  const onReset = () => {
    handleModalToggle();
  };

  const onSubmit = async (model, formikHelper) => {
    const newHotel = isEditForm
      ? await StaffClient.update(model.id, model)
      : await StaffClient.create(model);

    if (newHotel) {
      formikHelper.resetForm();
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title">
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
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
          }) => (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <DialogContent>
                <FormikInputField
                  margin="dense"
                  required
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={values.name}
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
                <FormikInputField
                  margin="dense"
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  value={values.phone}
                  autoFocus
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  disabled={isSubmitting}
                  >
                  Save
                </Button>
                <Button
                  type="reset"
                  onClick={handleReset}
                  variant="text"
                  size="small"
                  fullWidth
                  disabled={isSubmitting}
                  >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog >
    </div>
  );
};

export default StaffForm;
