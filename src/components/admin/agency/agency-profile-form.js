import React, { useRef, useCallback, useEffect, useState } from "react";
import { Grid, TextField, Button, Box, Divider, CircularProgress, Backdrop } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import LogoUpload from "../agency/logo-upload";
import AuthClient from "../../../api/auth-client";
import { AuthContext } from "../../../store/context";
import FileClient from "../../../api/file-client";
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
  const logoInput = useRef(null);
  const logoFormik = useRef(null);

  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const agencyProfile = useRef({
    phoneNumber: "151652",
    address: "ryftghu",
    logoFile: "az.jpg",
    id: "1",
  });

  const getAgency = async()=>{
    await AuthClient.getAgencyProfile(AuthContext.jwt).then((response) => {
      console.log("response",response);
      if(response.data.status===200){
        const agencyProfile=response.data.data;
        agencyProfile.current=({
          phoneNumber: agencyProfile.phoneNumber||"test",
          address: agencyProfile.address||"test",
          logoFile: agencyProfile.logoFile||"testLogoFile",
          id: agencyProfile.id||121,
        });
      }
      else{
        // TODO: Add error messag
      }
    })
    .catch((error)=>{})
    .finally(()=>{
      setLoading(false);
    });
  };

  useEffect(() => { 
    setLoading(true);
    getAgency();
  }, []);

  function handleBrowseLogoClick() {
    logoInput.current.click();
  }

  const logoInputChangeCallback = useCallback((event) => {
    logoFormik.current.setFieldValue("file", event.currentTarget.files[0]);
  }, []);

  const logoUploadMemoizedCallback = useCallback(
    ({ values }) => {
      console.log("agencyProfile", agencyProfile);
      return(
      <Box>
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
        <LogoUpload file={values.file} logoId={agencyProfile.logoFile} agencyId={agencyProfile.id} />
      </Box>
    )},
    [logoInput, logoInputChangeCallback, agencyProfile]
  );

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
        {({jwt}) => {
          return(
          <Formik
          initialValues={{ address: "", phoneNumber: "", logoFile: "" }}
          validationSchema={AgencyProfileSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("file",logoFormik.current.file);
            let fileId = null;
            await FileClient.upload(1, formData).then((response) => {
              if(response.data.status===200){
                fileId=response.data.data;
              }
              else{
                // TODO: Add error message
              }
            })
            .catch((error)=>{console.log("error", error)});// TODO: Add error message

            AuthClient.updateAgencyProfile(jwt, [
              {
              "op": "replace",
              "path": "/phoneNumber",
              "value": values.phoneNumber,
              },{
              "op": "replace",
              "path": "/address",
              "value": values.address
              },{
              "op": "replace",
              "path": "/logoFile",
              "value": fileId, }]).then((result) => {
                if(!result.hasError){
                  alert("Agency profile  is successfully updated!");
                }
                else{
                  alert("An error occured during Agency profile update!");
                }
              }).catch(()=>{
                alert("An error occured during Agency profile update!");
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
                    defaultValue={agencyProfile.address}
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
                    defaultValue={agencyProfile.phoneNumber}
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
                  <Formik innerRef={logoFormik} initialValues={{file: null}}>
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
        </Formik>);
        }}
      </AuthContext.Consumer>
    </Grid>
  );
}
