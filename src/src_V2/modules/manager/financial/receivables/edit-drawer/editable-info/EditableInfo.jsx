import { DateInput } from '../../../components';
import styles from './EditableInfo.module.css';

export default function EditableInfo({ values, setFieldValue }) {
  return (
    <DateInput
      name='dueDate'
      value={values.dueDate}
      label='Due Date'
      className={styles.dueDatePickerInput}
      searchHandler={(value) => setFieldValue('dueDate', value)}
    />
  );
}
