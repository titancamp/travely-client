import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';

import {
  mainInfoInitialValues,
  mainInfoSchema,
} from '../../../../../utils/schemas/tourManagment/activity';
import TagsInput from '../../components/tag/Tag';
import styles from './style.module.css';

export default function MainInfo({ parentRef, isValidate }) {
  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    setTouched,
    submitForm,
    handleChange,
    setFieldError,
    setFieldValue,
  } = useFormik({
    validationSchema: mainInfoSchema,
    initialValues: mainInfoInitialValues(parentRef.mainInfo.values),
  });

  const validateForm = () => isValidate && submitForm();
  const initializeTouchState = () => setTouched({ ...parentRef.mainInfo.touched });
  const addMainInfoToParent = () => (parentRef.mainInfo = { values, isValid, touched });

  useEffect(initializeTouchState, []);
  useEffect(validateForm, [isValidate]);
  useEffect(addMainInfoToParent, [values, isValid, touched]);

  return (
    <Box className={styles.mainInfo}>
      <form autoComplete='off'>
        <Box className={styles.mnRow}>
          <label className={styles.label}>Details</label>
          <Grid container rowSpacing={3} spacing={2} mb={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name='name'
                label='Type name'
                placeholder='Type name'
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.name && touched.name}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                name='description'
                label='Description'
                placeholder='Description'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                error={errors.description && touched.description}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TagsInput
                fullWidth
                name='attributes'
                label='Attributes'
                variant='outlined'
                placeholder='Add attribute'
                tags={values.attributes}
                error={errors.attributes}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name='duration'
                label='Duration'
                placeholder='Duration'
                onBlur={handleBlur}
                value={values.duration}
                onChange={handleChange}
                error={errors.duration && touched.duration}
                helperText={touched.duration && errors.duration}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={styles.mnRow}>
          <label className={styles.label}>Details</label>
          <Grid container mb={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='price'
                type='number'
                variant='outlined'
                onBlur={handleBlur}
                value={values.price}
                error={!!errors.price}
                onChange={handleChange}
                label='Price Per Persons'
                helperText={errors.price}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>AMD ~</InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={`${styles.mnRow} ${errors.notes ? '' : styles.helper}`}>
          <label className={styles.label}>Notes</label>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name='notes'
                label='Notes'
                onBlur={handleBlur}
                value={values.notes}
                error={!!errors.notes}
                onChange={handleChange}
                helperText={errors.notes}
                FormHelperTextProps={{ className: styles.helper }}
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}
