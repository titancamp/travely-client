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

export default function AddSupplierDetailsDialog({
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

  const newEvent = () => actions.addEvent(state);
  const onRadioChange = ({ currentTarget: { value } }) =>
    setFieldValue('selected', +value);

  return (
    <form autoComplete='off'>
      <DialogTitle sx={{}}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginTop: 2 }}>{icon}</div>
          <Typography variant={'h5'} style={{ marginLeft: 13, display: 'inline' }}>
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
        <div
          style={{
            paddingBottom: 5,
            height: 660,
            marginTop: 24,
            overflowY: 'auto',
          }}
        >
          {values.search ? (
            <RadioGroup onChange={onRadioChange}>
              <SupplierComponent
                values={values}
                expandedId={expandedId}
                expandCollapse={expandCollapse}
              />
            </RadioGroup>
          ) : (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
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
