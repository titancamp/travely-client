import { useState } from 'react';
import { TabPanel } from '@mui/lab';
import { Grid } from '@mui/material';
import { InfoCard } from '../../../components';
import { RoomsConstants } from '../../constants';

import styles from '../style.module.css';
import DialogManager from '../Index';

export default function Rooms() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const [rooms, setRooms] = useState(RoomsConstants);

  function deleteRoom(id) {
    setRooms(rooms.filter((room) => room.id !== id));
    onShowHideDialog({ open: false });
  }

  function editRoom(newRoom) {
    setRooms(rooms.map((room) => (newRoom.id === room.id ? newRoom : room)));
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
