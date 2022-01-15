import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import {
  Grid,
  Button,
  Dialog,
  TextField,
  IconButton,
  DialogTitle,
  Autocomplete,
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import styles from './style.module.css';
import { Languages, License } from '../constants';
import { EndAdornment } from '../../components/endAdornment';
import { AirlineSeatReclineNormal, EventSeat } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: 830,
    width: 830,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    paddingTop: 30,
    paddingBottom: 50,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <div className={styles.filterHeader}>
          <div>
            <Button className={styles.resetBtn} onClick={handleReset}>
              RESET
            </Button>
          </div>
          <IconButton
            aria-label='close'
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 16,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const handleReset = () => {
  //TODO reset form values
};

export default function AllFiltersDialog({ onClose, data: { open } }) {
  return (
    <form autoComplete='off'>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={onClose}
          className={`${styles.container} ${styles.header}`}
        >
          Filters
        </BootstrapDialogTitle>
        <DialogContent dividers className={styles.container}>
          <Grid item xs={4}>
            <Autocomplete
              className={styles.input}
              disablePortal
              id='combo-box-demo'
              options={License}
              name='license'
              renderInput={(params) => <TextField {...params} label='License Type' />}
            />
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              className={styles.input}
              multiple
              options={Languages}
              name='languages'
              renderInput={(params) => (
                <TextField {...params} name='languages' label='Languages' />
              )}
            />
          </Grid>
          <Grid className={styles.dashedBorder} />
          <Typography className={styles.roomTitle}>CARS</Typography>
          <Grid item xs={4}>
            <TextField
              fullWidth
              name='model'
              label='Model'
              placeholder='Model'
              className={styles.input}
            />
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Number of Seats</InputLabel>
                <OutlinedInput
                  name='seats'
                  label='Number of Seats'
                  endAdornment={<EndAdornment icon={<EventSeat />} />}
                  className={styles.input}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Number of Car Seats</InputLabel>
                <OutlinedInput
                  name='carSeats'
                  label='Number of Car Seats'
                  endAdornment={<EndAdornment icon={<AirlineSeatReclineNormal />} />}
                  className={styles.input}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </form>
  );
}
