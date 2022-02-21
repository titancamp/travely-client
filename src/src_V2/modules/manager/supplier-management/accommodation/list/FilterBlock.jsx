import { AddCircle, Tune } from '@mui/icons-material';
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AccommodationFilterSchema,
  FilterInitialValues,
} from '../../../../../utils/schemas/tourManagment/accommodation';
import { AccommodationTypes } from '../constants';
import DialogManager from '../dialogs/Index';
import styles from './style.module.css';

export default function FilterBlock() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const formikData = {
    validationSchema: AccommodationFilterSchema(),
    initialValues: FilterInitialValues(),
  };

  const { values, errors, touched, handleBlur, handleChange } = useFormik(formikData);

  function openAllFiltersDialog() {
    onShowHideDialog({
      open: true,
      mode: 'accommodationFilters',
      actions: {},
    });
  }

  return (
    <Box className={styles.box}>
      <div className={styles.leftSection}>
        <Typography className={styles.title}>Accommodations</Typography>
        <Grid container rowSpacing={3} spacing={2}>
          <Grid item>
            <Autocomplete
              size='small'
              onChange={handleChange}
              name='type'
              className={styles.select}
              disablePortal
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='Type*' />}
              onBlur={handleBlur}
              value={values.type}
              error={errors.type && touched.type}
              helperText={touched.type && errors.type}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              size='small'
              onChange={handleChange}
              name='region'
              className={styles.select}
              disablePortal
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='Region' />}
              onBlur={handleBlur}
              value={values.region}
              error={errors.region && touched.region}
              helperText={touched.region && errors.region}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              size='small'
              onChange={handleChange}
              name='city'
              className={styles.select}
              disablePortal
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='City' />}
              onBlur={handleBlur}
              value={values.city}
              error={errors.city && touched.city}
              helperText={touched.city && errors.city}
            />
          </Grid>
        </Grid>
      </div>
      <div className={styles.rightSection}>
        <Grid item>
          <Button variant='outlined' component='span' onClick={openAllFiltersDialog}>
            <Tune className={styles.filterBtnIcon} />
            All Filters
          </Button>
          <Button
            variant='contained'
            className={styles.addBtn}
            component='span'
            startIcon={<AddCircle />}
          >
            <Link to={'../add'}>Add new</Link>
          </Button>
          <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
        </Grid>
      </div>
    </Box>
  );
}
