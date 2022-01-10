import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddCircle, Tune } from '@mui/icons-material';
import { Box, Grid, Button, TextField, Typography, Autocomplete } from '@mui/material';
import { AccommodationTypes } from '../constants';
import DialogManager from '../dialogs/Index';
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
        <Typography className={styles.title}>Transportation</Typography>
        <Grid container rowSpacing={3} spacing={2}>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='Type' />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='Car' />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='Region' />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              className={styles.select}
              options={AccommodationTypes}
              renderInput={(params) => <TextField {...params} label='City' />}
            />
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
