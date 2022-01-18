import { Box, Grid, TextField, Autocomplete } from '@mui/material';
import { useEffect } from 'react';
import { useFormik } from 'formik';

import styles from './style.module.css';

export default function MainInfo({ parentRef }) {
  const {
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    setTouched,
    handleChange,
    setFieldValue,
  } = useFormik({ initialValues: {} });

  const initializeTouchState = () => setTouched({ ...parentRef.mainInfo.touched });
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const addMainInfoToParent = () => (parentRef.mainInfo = { values, isValid, touched });

  useEffect(initializeTouchState, []);
  useEffect(addMainInfoToParent, [values, isValid, touched]);

  return (
    <Box className={styles.mainInfo}>
      <form>
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
                name='description'
                label='Description'
                placeholder='Description'
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.name && touched.name}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={[]}
                value={values.attributes}
                onChange={autoCompleteChangeHandler('attributes')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='attributes'
                    label='Attributes'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.menuTags}
                    error={errors.menuTags && touched.menuTags}
                    helperText={touched.menuTags && errors.menuTags}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name='name'
                label='Duration'
                placeholder='Duration'
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.name && touched.name}
                helperText={touched.name && errors.name}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={`${styles.mnRow} ${errors.notes ? '' : styles.helper}`}>
          <label className={styles.label}>Notes</label>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                rows={4}
                fullWidth
                multiline
                name='notes'
                label='Notes'
                onBlur={handleBlur}
                value={values.notes}
                onChange={handleChange}
                error={!!errors.notes}
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
