import { Box, InputAdornment, TextField } from '@mui/material';

import { DateInput } from '../../../components';
import commonStyles from '../style.module.css';
import styles from './EditableInfo.module.css';

export default function EditableInfo({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  currency,
}) {
  return (
    <Box className={styles.editableFields}>
      <TextField
        name='actualCost'
        label='Actual Cost'
        variant='outlined'
        size='small'
        type='number'
        className={`${styles.actualCostControl} adornmentInput`}
        value={values.actualCost}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.actualCost && touched.actualCost}
        helperText={touched.actualCost && errors.actualCost}
        InputProps={{
          startAdornment: <InputAdornment position='start'>{currency}</InputAdornment>,
        }}
      />
      <DateInput
        name='dueDate'
        value={values.dueDate}
        label='Due Date'
        className={commonStyles.dueDatePickerInput}
        searchHandler={(value) => setFieldValue('dueDate', value)}
      />
    </Box>
  );
}
