import {
  Grid,
  Button,
  TextField,
  InputLabel,
  FormControl,
  DialogTitle,
  Autocomplete,
  OutlinedInput,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import { Person, LocalPhone } from '@mui/icons-material';

import {
  addDriverSchema,
  AddDriverInitialValues,
} from '../../../../../utils/schemas/tourManagment/transportation';

import styles from './style.module.css';
import { EndAdornment } from '../../components/endAdornment';
import { RoomServices } from '../../accommodation/constants';

//TODO License type
//TODO Languages
//TODO disable state

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
      <DialogContent style={{ paddingTop: 10 }}>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth className={styles.ctField}>
              <InputLabel error={errors.person && touched.person}>Name</InputLabel>
              <OutlinedInput
                name='name'
                onBlur={handleBlur}
                value={values.person}
                label='Name'
                onChange={handleChange}
                error={errors.person && touched.person}
                endAdornment={<EndAdornment icon={<Person />} />}
              />
              {touched.person && errors.person && (
                <FormHelperText error>{errors.person}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
              <FormControl fullWidth className={styles.ctField}>
                <InputLabel error={errors.phone && touched.phone}>
                  Contact Phone
                </InputLabel>
                <OutlinedInput
                  name='phone'
                  onBlur={handleBlur}
                  value={values.phone}
                  label='Contact Phone'
                  onChange={handleChange}
                  error={errors.phone && touched.phone}
                  endAdornment={<EndAdornment icon={<LocalPhone />} />}
                />
                {errors.phone && touched.phone && (
                  <FormHelperText error>{errors.phone}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={RoomServices}
                value={values.services}
                onChange={autoCompleteChangeHandler('license')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='license'
                    label='License Type'
                    onBlur={handleBlur}
                    disabled={values.type}
                    onChange={handleChange}
                    value={values.services}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={RoomServices}
              value={values.services}
              onChange={autoCompleteChangeHandler('languages')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name='languages'
                  label='Languages'
                  onBlur={handleBlur}
                  disabled={values.type}
                  onChange={handleChange}
                  value={values.services}
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
