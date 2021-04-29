import React, { useRef, useCallback, useEffect, useState } from "react";

import { Formik } from "formik";
import * as yup from "yup";

import {
  Grid,
  TextField,
  Button,
  Box,
  Divider,
  CircularProgress,
  Backdrop,
  Card,
  CardContent,
} from "@material-ui/core";

import AgencyClient from "../../../api/agency-client";
import FileClient from "../../../api/file-client";

import { AuthContext } from "../../../store/context";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import LogoUpload from "../agency/logo-upload";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AgencyProfileSchema = yup.object().shape({
  phoneNumber: yup
    .number()
    .typeError("Phone must be a number")
    .required("Required"),
});

export default function AgencyProfileForm() {
  const formik = useRef(null);
  const logoInput = useRef(null);

  const classes = useStyles();
  const authContext = JSON.parse(localStorage.getItem("AuthContext"));
  const [loading, setLoading] = useState(false);

  const getAgency = async () => {
    setLoading(true);
    await AgencyClient.get()
      .then((response) => {
        const data = response.data;
        formik.current.setValues({
          name: data.name,
          phoneNumber: data.phoneNumber,
          address: data.address,
          logoFile: data.logoFile,
          id: data.id,
        });
      })
      .catch((error) => {
        // TODO: Add error message
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAgency();
  }, []);

  const handleBrowseLogoClick = () => {
    logoInput.current.click();
  };

  const logoInputChangeCallback = useCallback(async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      try {
        setLoading(true);
        const fileId = await FileClient.upload(
          +localStorage.getItem("agencyId"),
          formData
        );
        formik.current.setValues({
          ...formik.current.values,
          logoFile: fileId,
        });
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const getAgencyProfileSubmitData = (values) => {
    const data = {
      phoneNumber: values.phoneNumber,
      address: values.address,
    };
    if (values.logoFile) {
      data.logoFile = values.logoFile;
    }
    return data;
  };

  const onFormSubmit = async (values) => {
    setLoading(true);
    await AgencyClient.update(getAgencyProfileSubmitData(values));
    setLoading(false);
    getAgency();
  };

  return (
    <Grid container justify="center">
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <AuthContext.Consumer>
              {({ ownerId }) => {
                return (
                  <Formik
                    innerRef={(ref) => (formik.current = ref)}
                    initialValues={{
                      name: "",
                      phoneNumber: "",
                      address: "",
                      logoFile: "",
                      id: "",
                    }}
                    validationSchema={AgencyProfileSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      onFormSubmit(values, ownerId).finally(() => {
                        setSubmitting();
                      });
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Box m={2}>
                          <TextField
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            label="Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            disabled
                          />
                          <Box color="error.main">
                            {errors.address &&
                              touched.address &&
                              errors.address}
                          </Box>
                        </Box>
                        <Box m={2}>
                          <TextField
                            type="text"
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            label="Address"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                          <Box color="error.main">
                            {errors.address &&
                              touched.address &&
                              errors.address}
                          </Box>
                        </Box>

                        <Box m={2}>
                          <TextField
                            type="tel"
                            name="phoneNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phoneNumber}
                            label="Phone"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                          <Box color="error.main">
                            {errors.phoneNumber &&
                              touched.phoneNumber &&
                              errors.phoneNumber}
                          </Box>
                        </Box>

                        <Box m={2}>
                          <Box>
                            <input
                              accept="image/*"
                              type="file"
                              ref={logoInput}
                              onChange={logoInputChangeCallback}
                              hidden
                            />
                            <Button
                              fullWidth
                              variant="outlined"
                              onClick={handleBrowseLogoClick}
                            >
                              <ImageOutlinedIcon
                                color="primary"
                                fontSize="small"
                              />{" "}
                              Browse and select logo
                            </Button>
                            <Divider />
                            <LogoUpload logoId={values.logoFile} />
                          </Box>
                        </Box>

                        <Box m={2}>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="contained"
                            color="primary"
                            fullWidth
                          >
                            Update profile
                          </Button>
                        </Box>
                      </form>
                    )}
                  </Formik>
                );
              }}
            </AuthContext.Consumer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
