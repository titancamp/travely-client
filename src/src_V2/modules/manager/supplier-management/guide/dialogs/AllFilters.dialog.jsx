import { Autocomplete, DialogContent, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';

import {
  FilterGuideSchema,
  FilterInitialValues,
} from '../../../../../utils/schemas/tourManagment/guide';
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from '../../components/bootstrapDialogTitle/BootstrapDialogTitle';
import { AllFiltersDialogStyles } from '../../transportation/dialogs/DialogStyles';
import { Languages } from '../constants';
import styles from './style.module.css';

export default function AllFiltersDialog({ onClose, data: { open } }) {
  const autoCompleteChangeHandler = (type) => (e, value) => setFieldValue(type, value);
  const formikData = {
    validationSchema: FilterGuideSchema(),
    initialValues: FilterInitialValues(),
  };

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, setValues } =
    useFormik(formikData);

  const handleReset = () => {
    setValues(FilterInitialValues());
  };

  return (
    <form autoComplete='off'>
      <BootstrapDialog onClose={onClose} open={open} styles={AllFiltersDialogStyles}>
        <BootstrapDialogTitle
          onClose={onClose}
          className={`${styles.container} ${styles.header}`}
          handleReset={handleReset}
        >
          Filters
        </BootstrapDialogTitle>
        <DialogContent dividers className={styles.container}>
          <Grid container rowSpacing={3} className={styles.langSkillsBlock}>
            <Grid item xs={10}>
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
            <Grid item xs={10}>
              <TextField
                fullWidth
                name='skills'
                label='Skills'
                value={values.skills}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.skills && touched.skills}
                helperText={touched.skills && errors.skills}
              />
            </Grid>
          </Grid>
          <Grid container rowSpacing={3}>
            <Grid item xs={2.5} className={styles.costInput}>
              <TextField
                fullWidth
                name='cost'
                label='Cost'
                value={values.cost}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.cost && touched.cost}
                helperText={touched.cost && errors.cost}
              />
            </Grid>
            <Grid item xs={2.5}>
              <TextField
                fullWidth
                name='experience'
                label='Experience'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.experience}
                error={errors.experience && touched.experience}
                helperText={touched.experience && errors.experience}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </form>
  );
}
