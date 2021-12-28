// import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MultipleSelectCheckmarks from '../MultipleSelectCheckmarks';
import styles from './style.module.css';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: 830,
    width: 830,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
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
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const options = [
  'Parking',
  'Free Wifi',
  'Room Service',
  '24-Hour Guest Reception',
  'Complimentary Toiletries',
  'Healthy Breakfast',
  'Ample Wall Outlets',
  'Hair Styling Tools',
  'Flexible Checkout',
  'Pool',
  'Mini-fridge',
  'Complimentary Electronics Chargers',
  'Clothing Iron',
  'Business Facilities',
  'Transportation Information',
  'Free Breakfast',
  'Laundry Services',
  'Spa & Wellness Amenities',
  ' Exercise Facilities and Accessories',
  'Daily Newspaper',
  'Entertainment',
  'Complimentary Luggage storage',
  'Cribs & Cots for Children',
  'Custom Offers',
  'Curated Experiences',
  'Fancy Bathrobes',
  'Kid-friendly Rooms and Products',
  'Premium Bedding',
  'Stain Remover Wipes',
  'Pet-friendly Rooms',
  'Champagne Bar',
];

export default function AllFiltersDialog({ open, handleClose }) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <BootstrapDialogTitle
        id='customized-dialog-title'
        onClose={handleClose}
        className={styles.container}
      >
        Filters
      </BootstrapDialogTitle>
      <DialogContent dividers className={styles.container}>
        <MultipleSelectCheckmarks options={options} width={782} />
        <Grid container item xs={6} spacing={2} className={styles.timeBlock}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type='time'
              defaultValue='00:00'
              label='Check In Time'
              inputProps={{ step: 300 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type='time'
              defaultValue='00:00'
              hiddenLabel={true}
              label='Check In Time'
              inputProps={{ step: 300 }}
            />
          </Grid>
        </Grid>
        <Grid className={styles.dashedBorder} />
        <Typography className={styles.roomTitle}>ROOMS</Typography>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={4}>
            <Autocomplete
              className={styles.roomType}
              disablePortal
              id='combo-box-demo'
              options={[
                { label: 'The Shawshank Redemption', year: 1994 },
                { label: 'The Godfather', year: 1972 },
              ]}
              renderInput={(params) => <TextField {...params} label='Type*' />}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              className={styles.roomQuantity}
              label='Quantity'
              placeholder='Quantity'
            />
          </Grid>
          <Grid item xs={3}>
            <TextField className={styles.roomPrice} label='Price' placeholder='Price' />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={styles.beds}
              label='Number of Beds'
              placeholder='Number of Beds'
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className={styles.beds}
              label='Additional Beds'
              placeholder='Additional Beds'
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={[
                { label: 'The Godfather', year: 1972 },
                { label: 'The Shawshank Redemption', year: 1994 },
              ]}
              renderInput={(params) => <TextField {...params} label='Room Services' />}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </BootstrapDialog>
  );
}
