import { AddCircle } from '@mui/icons-material';
import { AccessTime, AttachMoney } from '@mui/icons-material';
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
  FilterActivitySchema,
  FilterInitialValues,
} from '../../../../../utils/schemas/tourManagment/activity';
//TODO make this global for Supplier Management
import { Regions } from '../../accommodation/constants';
import { TransportationTypes } from '../constants';
import DialogManager from '../dialogs/Index';
import styles from './style.module.css';

export default function FilterBlock() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const formikData = {
    validationSchema: FilterActivitySchema(),
    initialValues: FilterInitialValues(),
  };
  const { values, errors, touched, handleBlur, handleChange } = useFormik(formikData);

  return (
    <Box className={styles.box}>
      <div className={styles.leftSection}>
        <Typography className={styles.title}>Activities</Typography>
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
              name='destination'
              className={styles.select}
              disablePortal
              options={Regions}
              renderInput={(params) => <TextField {...params} label='Destination' />}
              onBlur={handleBlur}
              value={values.region}
              error={errors.region && touched.region}
              helperText={touched.region && errors.region}
            />
          </Grid>
          <Grid item>
            <FormControl size='small' className={styles.priceInp}>
              <InputLabel>Duration</InputLabel>
              <OutlinedInput
                name='duration'
                type='number'
                startAdornment={
                  <InputAdornment position='start'>
                    <AccessTime />
                  </InputAdornment>
                }
                label='Duration'
                onBlur={handleBlur}
                value={values.duration}
                onChange={handleChange}
                error={errors.duration && touched.duration}
                helperText={touched.duration && errors.duration}
                FormHelperTextProps={{
                  className: styles.helperText,
                }}
              />
            </FormControl>
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
