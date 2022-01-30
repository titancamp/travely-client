import { DateInput } from '../../../../components';
import commonStyles from '../style.module.css';

export default function EditableInfo({ values, setFieldValue }) {
  return (
    <DateInput
      name='dueDate'
      value={values.dueDate}
      label='Due Date'
      className={commonStyles.dueDatePickerInput}
      searchHandler={(value) => setFieldValue('dueDate', value)}
    />
  );
}
