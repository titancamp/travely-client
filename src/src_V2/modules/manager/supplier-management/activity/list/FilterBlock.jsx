import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';
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
import { AccessTime, AttachMoney } from '@mui/icons-material';
import { TransportationTypes } from '../constants';
import DialogManager from '../dialogs/Index';
//TODO make this global for Supplier Management
import { Regions } from '../../accommodation/constants';
import styles from './style.module.css';

export default function FilterBlock() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });

  return (
    <Box className={styles.box}>
      <div className={styles.leftSection}>
        <Typography className={styles.title}>Activities</Typography>
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
              renderInput={(params) => <TextField {...params} label='Destination' />}
            />
          </Grid>
          <Grid item>
            <FormControl size='small' className={styles.priceInp}>
              <InputLabel>Price from</InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position='start'>
                    <AccessTime />
                  </InputAdornment>
                }
                label='Duration'
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size='small' className={styles.priceInp}>
              <InputLabel>Price from</InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position='start'>
                    <AttachMoney />
                  </InputAdornment>
                }
                label='Price from'
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size='small' className={styles.priceInp}>
              <InputLabel>Price from</InputLabel>
              <OutlinedInput
                startAdornment={
                  <InputAdornment position='start'>
                    <AttachMoney />
                  </InputAdornment>
                }
                label='Price to'
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div className={styles.rightSection}>
        <Grid item>
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
