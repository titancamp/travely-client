import { AddCircle, AttachMoney, Tune } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FilterInitialValues,
  FoodFiltersSchema,
} from '../../../../../utils/schemas/tourManagment/food';
//TODO make this global for Supplier Management
import { AccommodationTypes } from '../../accommodation/constants';
import { TransportationTypes } from '../constants';
import DialogManager from '../dialogs/Index';
import styles from './style.module.css';

export default function FilterBlock() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const formikData = {
    validationSchema: FoodFiltersSchema(),
    initialValues: FilterInitialValues(),
  };

  const { values, errors, touched, handleBlur, handleChange } = useFormik(formikData);

  function openAllFiltersDialog() {
    onShowHideDialog({
      open: true,
      mode: 'foodFilters',
      actions: {},
    });
  }

  return (
    <Box className={styles.box}>
      <div className={styles.leftSection}>
        <Typography className={styles.title}>Food</Typography>
        <Grid container rowSpacing={3} spacing={2}>
          <Grid item>
            <Autocomplete
              size='small'
              onChange={handleChange}
              name='type'
              className={styles.select}
              disablePortal
              options={TransportationTypes}
              renderInput={(params) => <TextField {...params} label='Type' />}
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
          <Grid item>
            <FormControl size='small' className={styles.priceInp}>
              <InputLabel>Price from</InputLabel>
              <OutlinedInput
                name='priceFrom'
                type='number'
                startAdornment={
                  <InputAdornment position='start'>
                    <AttachMoney />
                  </InputAdornment>
                }
                label='Price from'
                onBlur={handleBlur}
                value={values.priceFrom}
                onChange={handleChange}
                error={errors.priceFrom && touched.priceFrom}
                helperText={touched.priceFrom && errors.priceFrom}
                FormHelperTextProps={{
                  className: styles.helperText,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size='small' className={styles.priceInp}>
              <InputLabel>Price to</InputLabel>
              <OutlinedInput
                name='priceTo'
                type='number'
                startAdornment={
                  <InputAdornment position='start'>
                    <AttachMoney />
                  </InputAdornment>
                }
                label='Price to'
                onBlur={handleBlur}
                value={values.priceTo}
                onChange={handleChange}
                error={errors.priceTo && touched.priceTo}
                helperText={touched.priceTo && errors.priceTo}
                FormHelperTextProps={{
                  className: styles.helperText,
                }}
              />
            </FormControl>
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
            <Link to='../add'>Add new</Link>
          </Button>
          <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
        </Grid>
      </div>
    </Box>
  );
}
