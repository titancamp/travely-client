import { Box, TextField, Autocomplete, Grid, Button } from "@mui/material";
import { Map } from "@mui/icons-material";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from "./style.module.css";
import { AccommodationTypes, HotelServices } from "../constants";

/**
 * TODO
 * 1. Pin on Map
 * 2. Time Picker styles
 * 3. Static data get from backend?
 */

const validationSchema = Yup.object({
  email: Yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
}

export default function MainInfo({ accommodation }) {
  return (
    <Box className={styles.mainInfo}>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Details</label>
        <Grid container rowSpacing={3} spacing={2}>
          <Grid item xs={6}>
            <Autocomplete
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label="Type*" />}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Name*" placeholder="Name*" />
          </Grid>
          <Grid container item xs={6} mb={3} spacing={2} rowSpacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="time"
                defaultValue="00:00"
                label="Check In Time"
                inputProps={{step: 300}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="time"
                defaultValue="00:00"
                hiddenLabel={true}
                label="Check In Time"
                inputProps={{step: 300}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Address</label>
        <Grid container mb={3} rowSpacing={3} spacing={2}>
          <Grid item xs={12}>
            <Button
              startIcon={<Map color={"primary"} />}
              className={styles.map}
            >
              PIN ON MAP
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Region" placeholder="Placeholder" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="City" placeholder="Placeholder" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Address" placeholder="Placeholder" />
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Services</label>
        <Grid container mb={4} spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={HotelServices}
              renderInput={(params) => (
                <TextField {...params} label="Hotel Services" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.mnRow}>
        <label className={styles.label}>Notes</label>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField rows={4} fullWidth multiline label="Notes" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
