import { Person } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import {
  AddDriverInitialValues,
  addDriverSchema,
} from '../../../../../utils/schemas/tourManagment/transportation';
import { EndAdornment } from '../../components/endAdornment';
import { Languages, License } from '../constants';
import styles from './style.module.css';

export default function AddEditDriverDialog({ onClose, onSuccess, driver, editMode }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);

  const formikData = {
    onSubmit: onSuccess,
    validationSchema: addDriverSchema(),
    initialValues: AddDriverInitialValues(driver),
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik(formikData);

  return (
    <form onSubmit={handleSubmit} autoComplete='off'>
      <DialogTitle id='alert-dialog-title'>
        {editMode ? 'Edit' : 'Add'} Driver
      </DialogTitle>
      <DialogContent className={styles.viewTitle}>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel error={errors.name && touched.name}>Name</InputLabel>
              <OutlinedInput
                name='name'
                label='Name'
                onBlur={handleBlur}
                value={values.name}
                onChange={handleChange}
                error={errors.name && touched.name}
                endAdornment={<EndAdornment icon={<Person />} />}
              />
              {touched.name && errors.name && (
                <FormHelperText error>{errors.name}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel error={errors.phone && touched.phone}>
                  Contact Phone
                </InputLabel>
                <OutlinedInput
                  name='phone'
                  onBlur={handleBlur}
                  value={values.phone}
                  label='Contact Phone'
                  onChange={handleChange}
                  startAdornment={
                    <Typography sx={{ color: 'text.secondary', mt: 0.2 }}>
                      +374&nbsp;
                    </Typography>
                  }
                  error={errors.phone && touched.phone}
                />
                {errors.phone && touched.phone && (
                  <FormHelperText error>{errors.phone}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                multiple
                options={License}
                value={values.license}
                onChange={autoCompleteChangeHandler('license')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='license'
                    label='License Type'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors.license && touched.license}
                    helperText={touched.license && errors.license}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={Languages}
              value={values.languages}
              onChange={autoCompleteChangeHandler('languages')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name='languages'
                  label='Languages'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.languages}
                  error={errors.languages && touched.languages}
                  helperText={touched.languages && errors.languages}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={styles.dialogAction}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='submit' variant='contained'>
          {editMode ? 'Edit' : 'Add'}
        </Button>
      </DialogActions>
    </form>
  );
}
