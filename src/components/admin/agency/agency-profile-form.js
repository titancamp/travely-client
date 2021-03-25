import React, { useRef, useCallback, useEffect, useState } from "react";

import { Formik } from "formik";
import * as yup from "yup";

import { Grid, TextField, Button, Box, Divider, CircularProgress, Backdrop } from "@material-ui/core";

import AuthClient from "../../../api/auth-client";
import FileClient from "../../../api/file-client";

import { AuthContext } from "../../../store/context";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import LogoUpload from "../agency/logo-upload";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const AgencyProfileSchema = yup.object().shape({
  phoneNumber: yup.number().typeError("Phone must be a number").required("Required"),
});

export default function AgencyProfileForm() {
  const formik = useRef(null);
  const logoInput = useRef(null);
  const logoFormik = useRef(null);

  const classes = useStyles();
  const authContext = JSON.parse(localStorage.getItem("AuthContext"));
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    const getAgency = async () => {
      await AuthClient.getAgencyProfile(authContext.accessToken).then((response) => {
        if(response.status === 200){
          const data = response.data;
          formik.current.setValues({
            phoneNumber: data.phoneNumber,
            address: data.address,
            logoFile: data.logoFile,
            id: data.id,
          })
        }
        else{
          // TODO: Add error message
        }
      })
      .catch((error)=>{
        // TODO: Add error message
      })
      .finally(()=>{
        setLoading(false);
      });
    };
    setLoading(true);
    getAgency();
  }, [authContext.accessToken]);

  const handleBrowseLogoClick = () => {
    logoInput.current.click();
  };

  const logoInputChangeCallback = useCallback((event) => {
    logoFormik.current.setFieldValue("file", event.currentTarget.files[0]);
  }, []);

  const logoUploadMemoizedCallback = useCallback(
    ({ values }) =>
      (<Box>
        <input
         name="logoFile"
          type="file"
          ref={logoInput}
          onChange={logoInputChangeCallback}
          hidden
        />
        <Button fullWidth variant="outlined" onClick={handleBrowseLogoClick}>
          <ImageOutlinedIcon color="primary" fontSize="small" /> Browse and
          select logo
        </Button>
        <Divider />
        <LogoUpload file={values.file} logoId={values.logoFile} agencyId={authContext.agencyId} />
      </Box>),
    [logoInput, logoInputChangeCallback, authContext.agencyId]
  );

  const getAgencyProfileSubmitData = (values, fileId) => {
    return [
      {
      "op": "replace",
      "path": "/phoneNumber",
      "value": values.phoneNumber,
      },
      {
      "op": "replace",
      "path": "/address",
      "value": values.address
      },
      {
      "op": "replace",
      "path": "/logoFile",
      "value": fileId,
      }
    ]
  };

  const onFormSubmit = async (values, accessToken, ownerId) => {
    const formData = new FormData();
    formData.append("file", logoFormik.current.file);
    let fileId = "";

    await FileClient.upload(ownerId, formData).then((response) => {
      if(response.status === 200){
        fileId = response.data.data;
      }
      else{
        // TODO: Add error message
      }
    })
    .catch((error) => {
      console.log("error", error)
    }); // TODO: Add error message

    AuthClient.updateAgencyProfile(accessToken, getAgencyProfileSubmitData(values, fileId))
      .then((result) => {
        if (result.status === 200) {
          alert("Agency profile is successfully updated!");
        }
        else {
          alert("An error occured during Agency profile update!");
        }
      })
      .catch(() => {
        alert("An error occured during Agency profile update!");
      });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      
      <AuthContext.Consumer>
        {({ accessToken, ownerId }) => {
          return(
            <Formik
              innerRef={ (ref) => (formik.current = ref) }
              initialValues={{
                phoneNumber: "",
                address: "",
                logoFile: "",
                id: "",
              }}
              validationSchema={ AgencyProfileSchema }
              onSubmit={ async (values, { setSubmitting }) => {
                onFormSubmit(values, accessToken, ownerId)
                  .finally(() => {
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
                <Grid item xs={4}>
                  <form onSubmit={handleSubmit}>
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
                        {errors.address && touched.address && errors.address}
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
                        {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                      </Box>
                    </Box>

                    <Box m={2}>
                      <Formik innerRef={logoFormik} initialValues={{ file: null, logoFile: values.logoFile }}>
                        {logoUploadMemoizedCallback}
                      </Formik>
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
                </Grid>
              )}
            </Formik>
          );
        }}
      </AuthContext.Consumer>
    </Grid>
  );
}
