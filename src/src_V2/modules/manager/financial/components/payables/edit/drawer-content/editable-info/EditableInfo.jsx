import { Box, InputAdornment, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';

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
        className={styles.actualCostControl}
        value={values.actualCost}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.actualCost && errors.actualCost}
        helperText={touched.actualCost && errors.actualCost}
        InputProps={{
          startAdornment: <InputAdornment position='start'>{currency}</InputAdornment>,
        }}
      />
      <Box className={styles.dueDatePicker}>
        <DatePicker
          name='dueDate'
          label='Due date'
          inputFormat='dd/MM/yyyy'
          value={values.dueDate}
          onChange={(newValue) => setFieldValue('dueDate', newValue.toString())}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </Box>
  );
}
