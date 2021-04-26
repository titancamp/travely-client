import React, { useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import ActivityClient from "../../../api/activity-client";

const validationSchema = yup.object({
  type: yup.string("Enter activity type").required("Activity type is required"),
  name: yup.string("Enter avitvity name").required("Avitvity name is required"),
  address: yup.string("Enter address"),
  contactName: yup.string("Enter contact name"),
  email: yup.string("Enter email").email("Enter a valid email"),
  phone: yup.string("Enter phone"),
  website: yup.string("Enter website"),
  price: yup.number("Enter only numbers"),
});

const AddEditActivity = ({
  isOpen,
  handleSaveActivityToggle,
  activityModel,
  onClose,
  onSave,
}) => {
  const isEditForm = Boolean(activityModel && activityModel.id);
  const initialValues = activityModel || {
    type: "",
    name: "",
    address: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    price: null,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (model, formikHelper) => {
      console.log(initialValues);
      const data = { ...model };
      data.price = +data.price;
      data.type = {
        activityName: model.type,
        agencyId: +localStorage.getItem("agencyId"),
      };
      const newActivity = isEditForm
        ? await ActivityClient.editActivity(data)
        : await ActivityClient.addActivity(data);

      if (newActivity) {
        formikHelper.resetForm();
      }
      onSave && onSave();
    },
    onReset: () => {
      handleSaveActivityToggle();
    },
  });

  const inputMb = 1;
  const dialogTitle = isEditForm ? "Edit activity" : "Add new activity";

  const handleClose = useCallback(() => {
    formik.handleReset();
    onClose();
  }, [onClose, formik]);

  return (
    <Dialog open={isOpen} maxWidth="lg">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Container>
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box mb={inputMb}>
                  <TextField
                    fullWidth
                    id="type"
                    name="type"
                    placeholder="Type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Box mb={inputMb}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Box mb={inputMb}>
                  <TextField
                    fullWidth
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && !!formik.errors.address}
                    helperText={formik.touched.address && formik.errors.address}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box mb={inputMb}>
                  <TextField
                    fullWidth
                    id="contactName"
                    name="contactName"
                    placeholder="Contact name"
                    value={formik.values.contactName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.contactName && !!formik.errors.contactName
                    }
                    helperText={
                      formik.touched.contactName && formik.errors.contactName
                    }
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box mb={inputMb}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box mb={inputMb}>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && !!formik.errors.phone}
                    helperText={formik.touched.phone && formik.errors.phone}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box mb={inputMb}>
                  <TextField
                    fullWidth
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && !!formik.errors.price}
                    helperText={formik.touched.price && formik.errors.price}
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Box mb={inputMb}>
                  <TextField
                    fullWidth
                    id="website"
                    name="website"
                    placeholder="Website"
                    value={formik.values.website}
                    onChange={formik.handleChange}
                    error={formik.touched.website && !!formik.errors.website}
                    helperText={formik.touched.website && formik.errors.website}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box mb={inputMb}>
                  <Typography>Attachments: Coming soon...</Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>
      <DialogActions>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={3}>
            <Button
              type="submit"
              onClick={formik.handleSubmit}
              variant="contained"
              color="primary"
              size="small"
              fullWidth
            >
              {isEditForm ? "Edit" : "Add"} activity
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              type="reset"
              onClick={handleClose}
              variant="text"
              size="small"
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditActivity;
