import { DatePicker } from '@mui/lab';
import { Box, TextField } from '@mui/material';

import styles from './DateInput.module.css';

export default function DateInput({
  name,
  value,
  label,
  format = 'dd/MM/yyyy',
  className,
  searchHandler,
}) {
  return (
    <Box className={`${styles.dueDatePicker} ${styles.dueDatePickerInput} ${className}`}>
      <DatePicker
        name={name}
        label={label}
        inputFormat={format}
        value={value}
        onChange={(newValue) => searchHandler(newValue?.toString())}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ classes: { shrink: `${styles.datePickerLblFocused}` } }}
          />
        )}
      />
    </Box>
  );
}
