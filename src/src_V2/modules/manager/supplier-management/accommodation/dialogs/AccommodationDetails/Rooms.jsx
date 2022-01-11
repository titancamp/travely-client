import { useState } from 'react';
import { TabPanel } from '@mui/lab';
import { Grid } from '@mui/material';
import { InfoCard } from '../../../components';

import styles from '../style.module.css';
import DialogManager from '../Index';

export default function Rooms() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
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

  function deleteRoom(id) {
    setRooms(rooms.filter((driver) => driver.id !== id));
    onShowHideDialog({ open: false });
  }

  function editRoom(newDriver) {
    setRooms(rooms.map((driver) => (newDriver.id === driver.id ? newDriver : driver)));
    onShowHideDialog({ open: false });
  }

  function openDeleteCardDialog(id) {
    onShowHideDialog({
      open: true,
      state: { id },
      mode: 'delete',
      actions: deleteRoom,
    });
  }

  function openEditCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'edit',
      actions: editRoom,
      state: rooms.find((driver) => driver.id === id),
    });
  }

  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view',
      state: rooms.find((driver) => driver.id === id),
      actions: { openDeleteCardDialog, openEditCardDialog },
    });
  }

  return (
    <>
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
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </>
  );
}
