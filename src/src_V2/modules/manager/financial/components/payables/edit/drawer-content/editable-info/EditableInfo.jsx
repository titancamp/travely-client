import { Box, InputAdornment, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import styles from './EditableInfo.module.css';

export default function EditableInfo({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box className={styles.dueDatePicker}>
          <DesktopDatePicker
            name='dueDate'
            label='Due date'
            inputFormat='dd/MM/yyyy'
            value={values.dueDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
}
