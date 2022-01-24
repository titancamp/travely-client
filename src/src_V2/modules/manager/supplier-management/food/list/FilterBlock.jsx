import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddCircle, Tune } from '@mui/icons-material';
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Autocomplete,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { TransportationTypes } from '../constants';
import DialogManager from '../dialogs/Index';
//TODO make this global for Supplier Management
import { Regions } from '../../accommodation/constants';
import styles from './style.module.css';

export default function FilterBlock() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });

  function openAllFiltersDialog() {
    onShowHideDialog({
      open: true,
      mode: 'foodFilters',
      actions: {},
    });
  }

  return (
    <Box className={styles.box}>
      <div className={styles.leftSection}>
        <Typography className={styles.title}>Food</Typography>
        <Grid container rowSpacing={3} spacing={2}>
          <Grid item>
            <Autocomplete
              size='small'
              className={styles.select}
              options={TransportationTypes}
              renderInput={(params) => <TextField {...params} label='Type' />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              size='small'
              className={styles.select}
              options={Regions}
              renderInput={(params) => <TextField {...params} label='Region' />}
            />
          </Grid>
          <Grid item>
            <Autocomplete
              size='small'
              className={styles.select}
              options={Regions}
              renderInput={(params) => <TextField {...params} label='City' />}
            />
          </Grid>
          <Grid item>
            <FormControl size='small' className={styles.priceInp}>
              <InputLabel>Price from</InputLabel>
              <OutlinedInput
                startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                label='Price from'
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size='small' className={styles.priceInp}>
              <InputLabel>Price to</InputLabel>
              <OutlinedInput
                startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                label='Price to'
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div className={styles.rightSection}>
        <Grid item>
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
            <Link to='../add'>Add new</Link>
          </Button>
          <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
        </Grid>
      </div>
    </Box>
  );
}