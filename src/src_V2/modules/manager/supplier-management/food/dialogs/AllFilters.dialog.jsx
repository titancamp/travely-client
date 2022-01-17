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
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import styles from './style.module.css';
import { Languages } from '../constants';

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
          <Typography className={styles.roomTitle}>Working Hours</Typography>
          <Grid className={styles.workingHoursSection} item container spacing={3}>
            <Grid item xs={2.6}>
              <FormControlLabel
                control={<Checkbox name='gilad' />}
                label='Working Days'
              />
            </Grid>
            <Grid item xs={3.2}>
              <TextField
                fullWidth
                type='time'
                name='checkIn'
                label='Check In Time'
                inputProps={{ step: 60, min: 10 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={3.2}>
              <TextField
                fullWidth
                type='time'
                name='checkIn'
                label='Check In Time'
                inputProps={{ step: 60, min: 10 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Grid item container spacing={3}>
            <Grid item xs={2.6}>
              <FormControlLabel control={<Checkbox name='gilad' />} label='Weekend' />
            </Grid>
            <Grid item xs={3.2}>
              <TextField
                fullWidth
                type='time'
                name='checkIn'
                label='Check In Time'
                inputProps={{ step: 60, min: 10 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={3.2}>
              <TextField
                fullWidth
                type='time'
                name='checkIn'
                label='Check In Time'
                inputProps={{ step: 60, min: 10 }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </form>
  );
}
