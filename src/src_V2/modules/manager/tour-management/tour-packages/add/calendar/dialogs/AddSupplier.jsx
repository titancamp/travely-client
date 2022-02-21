import { Close, Search } from '@mui/icons-material';
import {
  DialogContent,
  DialogTitle,
  IconButton,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';

import { NoData } from '../../../../../../../components';
import { DialogAction } from './component';
import styles from './styles.module.css';

export default function AddSupplier({
  onClose,
  data: { actions, state },
  title,
  icon,
  SupplierComponent,
}) {
  const [expandedId, expandCollapse] = useState(0);
  const { values, handleChange, setFieldValue } = useFormik({
    initialValues: { search: '', selected: '', expandedId: 0 },
  });

  const newEvent = () => actions.addEvent(state, { id: values.selected, title });
  const onRadioChange = ({ currentTarget: { value } }) =>
    setFieldValue('selected', +value);

  return (
    <form autoComplete='off'>
      <DialogTitle>
        <div className={styles.flex}>
          <div className={styles.icon}>{icon}</div>
          <Typography variant={'h5'} className={styles.title}>
            {title}
          </Typography>
        </div>
        <IconButton component='span' onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          size='small'
          name='search'
          variant='outlined'
          placeholder='Search'
          value={values.search}
          onChange={handleChange}
          InputProps={{
            startAdornment: <Search position='start' color={'action'} sx={{ mr: 1 }} />,
          }}
        />
        <div className={styles.itemsContainer}>
          {values.search ? (
            <RadioGroup onChange={onRadioChange}>
              <SupplierComponent
                values={values}
                expandedId={expandedId}
                expandCollapse={expandCollapse}
              />
            </RadioGroup>
          ) : (
            <div className={styles.noData}>
              <NoData />
            </div>
          )}
        </div>
      </DialogContent>
      <DialogAction
        onClose={onClose}
        newEvent={newEvent}
        show={values.search}
        disabled={!values.selected}
      />
    </form>
  );
}
