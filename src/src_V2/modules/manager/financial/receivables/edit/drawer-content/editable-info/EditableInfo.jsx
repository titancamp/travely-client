import { DatePicker } from '@mui/lab';
import { Box, TextField } from '@mui/material';

import commonStyles from '../style.module.css';
import styles from './EditableInfo.module.css';

export default function EditableInfo({ values, setFieldValue }) {
  return (
    <Box className={styles.editableFields}>
      <Box className={`${commonStyles.dueDatePicker} ${styles.dueDatePickerInput}`}>
        <DatePicker
          name='dueDate'
          label='Due date'
          inputFormat='dd/MM/yyyy'
          value={values.dueDate}
          onChange={(newValue) => setFieldValue('dueDate', newValue?.toString())}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </Box>
  );
}
