import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddCircle, Tune } from '@mui/icons-material';
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Autocomplete,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { AccommodationTypes } from '../constants';
import DialogManager from '../dialogs';
import styles from './style.module.css';

export default function FilterBlock() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });

  function openAllFiltersDialog() {
    onShowHideDialog({
      open: true,
      mode: 'accommodationFilters',
      actions: {},
    });
  }

  return (
    <Box className={styles.box}>
      <div className={styles.leftSection}>
        <Typography className={styles.title}>Accommodations</Typography>
        <Grid container rowSpacing={3} spacing={2}>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='Type*' />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='Region*' />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='City*' />}
            />
          </Grid>
          <Grid item>
            <FormControl className={styles.priceInp}>
              <InputLabel htmlFor='outlined-adornment-amount'>Price from</InputLabel>
              <OutlinedInput
                id='outlined-adornment-amount'
                startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                label='Price from'
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={styles.priceInp}>
              <InputLabel htmlFor='outlined-adornment-amount'>Price to</InputLabel>
              <OutlinedInput
                id='outlined-adornment-amount'
                startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                label='Price to'
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div className={styles.rightSection}>
        <Grid item className={styles.filterBtnsBlock}>
          <Button variant='outlined' component='span' onClick={openAllFiltersDialog}>
            <Tune className={styles.filterBtnIcon} />
            All Filters
          </Button>
          <Button
            variant='contained'
            className={styles.addBtn}
            component='span'
            startIcon={<AddCircle />}
          >
            <Link to={`../add`}>Add new</Link>
          </Button>
          <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
        </Grid>
      </div>
    </Box>
  );
}
