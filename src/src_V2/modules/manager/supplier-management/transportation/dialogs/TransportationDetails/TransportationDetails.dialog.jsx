import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { TabList, TabContext } from '@mui/lab';
import { Edit, Delete, Close } from '@mui/icons-material';
import { Box, Tab, Dialog, IconButton, DialogTitle, DialogContent } from '@mui/material';
import Drivers from './Drivers';
import Cars from './Cars';
import MainInfo from './MainInfo';
import DialogManager from '../Index';
import Partnership from './Partnership';

import styles from '../style.module.css';

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

export default function TransportationDetailsDialog({ onClose, data: { open } }) {
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
                <Tab label='DRIVERS' value='2' />
                <Tab label='CARS' value='3' />
                <Tab label='PARTNERSHIP' value='4' />
              </TabList>
            </Box>
            <MainInfo />
            <Drivers />
            <Cars />
            <Partnership />
          </TabContext>
        </Box>
      </DialogContent>
      {/*<DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />*/}
    </BootstrapDialog>
  );
}
