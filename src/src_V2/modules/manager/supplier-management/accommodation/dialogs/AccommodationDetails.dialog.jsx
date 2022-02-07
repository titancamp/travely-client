import {
  AccessTime,
  Close,
  Delete,
  Edit,
  Email,
  LocalPhone,
  LocationOn,
  Person,
} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Grid, Typography } from '@mui/material';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';

import { InfoCard } from '../../components';
import DialogManager from './Index';
import styles from './style.module.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    position: 'absolute',
    top: 10,
    right: 10,
    margin: 'inherit',
    maxWidth: 900,
    width: 900,
    height: 1180,
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
        <div>
          <Edit className={styles.headerActions} />
          <Delete className={`${styles.headerDeleteBtn} ${styles.headerActions}`} />
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
            <Close />
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

export default function AccommodationDetailsDialog({ onClose, data: { open } }) {
  const [value, setValue] = React.useState('1');
  const [rooms, setRooms] = useState([
    {
      beds: '6',
      price: '8000',
      type: {
        id: 1,
        label: 'Standard Single',
      },
      quantity: '11',
      services: [],
      additionalBeds: '',
      id: 1,
    },
    {
      beds: '5',
      price: '3000',
      type: {
        id: 4,
        label: 'Twin',
      },
      quantity: '17',
      services: [],
      additionalBeds: '',
      id: 2,
    },
    {
      beds: '4',
      price: '2000',
      type: {
        id: 1,
        label: 'Standard Single',
      },
      quantity: '22',
      services: [],
      additionalBeds: '',
      id: 3,
    },
  ]);
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function deleteRoom(id) {
    setRooms(rooms.filter((room) => room.id !== id));
    onShowHideDialog({ open: false });
  }

  function editRoom(newRoom) {
    setRooms(rooms.map((room) => (newRoom.id === room.id ? newRoom : room)));
    onShowHideDialog({ open: false });
  }

  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view',
      state: rooms.find((room) => room.id === id),
      actions: { openDeleteCardDialog, openEditCardDialog },
    });
  }

  function openEditCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'edit',
      actions: editRoom,
      state: rooms.find((room) => room.id === id),
    });
  }

  function openDeleteCardDialog(id) {
    onShowHideDialog({
      open: true,
      state: { id },
      mode: 'delete',
      actions: deleteRoom,
    });
  }

  const services = ['Breakfast', 'Free Wifi', 'Room service', 'Hearing accessible'];

  return (
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
        Agency / Agency Name Example
      </BootstrapDialogTitle>
      <DialogContent dividers className={styles.container}>
        <Box className={styles.dialogMenu}>
          <TabContext value={value}>
            <Box
              className={styles.headerMenu}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='MAIN INFO' value='1' />
                <Tab label='ROOMS' value='2' />
                <Tab label='PARTNERSHIP' value='3' />
              </TabList>
            </Box>
            <TabPanel className={styles.mainInfo} value='1'>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <LocationOn className={styles.detailsIcon} />
                  <Typography>Address</Typography>
                </Grid>
                <Typography>
                  4/1, Tandzaghpyur Street 2, Tsaghkadzor 2310 / Tsaghkadzor / Kotayq{' '}
                </Typography>
              </Grid>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <LocalPhone className={styles.detailsIcon} />
                  <Typography>Phone</Typography>
                </Grid>
                <Typography> +374 11 11 11 11 </Typography>
              </Grid>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <Person className={styles.detailsIcon} />
                  <Typography>Contact Person</Typography>
                </Grid>
                <Typography>John Doe</Typography>
              </Grid>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <Email className={styles.detailsIcon} />
                  <Typography>Email</Typography>
                </Grid>
                <Typography>customer.care@marriott.com</Typography>
              </Grid>
              <Grid className={styles.itemBlock}>
                <Grid className={styles.infoItem}>
                  <AccessTime className={styles.detailsIcon} />
                  <Typography>Check In / Check Out</Typography>
                </Grid>
                <Typography>12:00 / 2:00</Typography>
              </Grid>
              <Grid className={styles.dashedBorder} />
              <Typography className={styles.roomTitle}>SERVICES</Typography>
              {services.map((service) => (
                <Button
                  variant='contained'
                  key={service}
                  className={styles.detailsServiceBtns}
                  component='span'
                >
                  {service}
                </Button>
              ))}
              <Grid className={styles.dashedBorder} />
              <Typography className={styles.roomTitle}>NOTES</Typography>
              <Typography>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                Velit officia consequat duis enim velit mollit. Exercitation veniam
                consequat sunt nostrud amet.
              </Typography>
            </TabPanel>
            <TabPanel className={styles.roomsTabPanel} value='2'>
              <Grid className={styles.roomsSection}>
                {rooms.map((room) => (
                  <InfoCard
                    id={room.id}
                    key={room.id}
                    sectionData={{
                      1: {
                        value: room.quantity,
                        label: 'Qty: ',
                      },
                      2: {
                        value: room.type?.label,
                        label: null,
                      },
                      3: {
                        value: room.beds,
                        label: 'Beds: ',
                      },
                      4: {
                        value: `${room.price} ${room.price ? 'AMD' : ''}`,
                        label: room.price ? '' : 'Price: ',
                      },
                    }}
                    seeDetailsAction={openViewCardDialog}
                  />
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value='3' className={styles.partnership}>
              <Box>
                <Typography className={styles.partnershipSectionTitle}>
                  Details
                </Typography>
                <Box className={styles.partnershipDetailsSection}>
                  <Box className={styles.partnershipSectionBlock}>
                    <Typography>Sign Date</Typography>
                    <Typography>12.03.2021</Typography>
                  </Box>
                  <Box className={styles.partnershipSectionBlock}>
                    <Typography>Expiry Date</Typography>
                    <Typography>12.03.2021</Typography>
                  </Box>
                  <Box className={styles.partnershipSectionBlock}>
                    <Button
                      variant='contained'
                      className={styles.detailsServiceBtns}
                      component='span'
                    >
                      Mariot-Contract 2021
                    </Button>
                  </Box>
                  <Box className={styles.partnershipSectionBlock}>
                    <Button
                      variant='contained'
                      className={styles.detailsServiceBtns}
                      component='span'
                    >
                      Mariot-Related Documents
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Grid className={styles.dashedBorder} />
              <Box>
                <Typography className={styles.partnershipSectionTitle}>
                  Details
                </Typography>
                <Box className={styles.partnershipDetailsSection}>
                  <Box className={styles.partnershipSectionBlock}>
                    <Typography>Percentage</Typography>
                    <Typography> 10%</Typography>
                  </Box>
                  <Box className={styles.partnershipSectionBlock}>
                    <Typography>Fixed Price</Typography>
                    <Typography>10000 AMD</Typography>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </DialogContent>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </BootstrapDialog>
  );
}
