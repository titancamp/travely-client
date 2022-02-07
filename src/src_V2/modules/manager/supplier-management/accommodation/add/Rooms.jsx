import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';

import DialogManager from '../dialogs/Index';
import { AddCard, InfoCard } from '../../components';

import styles from './style.module.css';

export default function Rooms({ parentRef }) {
  const [rooms, setRooms] = useState(parentRef.rooms);
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const addRoomsToAccommodationData = () => (parentRef.rooms = rooms);

  function addRoom(room) {
    room.id = rooms.length ? rooms[rooms.length - 1].id + 1 : 1;
    setRooms([...rooms, room]);
    onShowHideDialog({ open: false });
  }

  function deleteRoom(id) {
    setRooms(rooms.filter((room) => room.id !== id));
    onShowHideDialog({ open: false });
  }

  function editRoom(newRoom) {
    setRooms(rooms.map((room) => (newRoom.id === room.id ? newRoom : room)));
    onShowHideDialog({ open: false });
  }

  function openAddCardDialog() {
    onShowHideDialog({
      open: true,
      mode: 'add',
      actions: addRoom,
    });
  }

  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view',
      state: rooms.find((room) => room.id === id),
      actions: { openDeleteCardDialog, openEditCardDialog },
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

  function openEditCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'edit',
      actions: editRoom,
      state: rooms.find((room) => room.id === id),
    });
  }

  useEffect(addRoomsToAccommodationData, [rooms]);

  return (
    <Box className={styles.roomContent}>
      <Grid container spacing={1}>
        <AddCard
          title='Rooms'
          buttonText='ADD ROOM'
          tooltipKeyWord={'room'}
          disabled={rooms.length === 50}
          onOpenDialog={openAddCardDialog}
        />
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
            areaAction={openViewCardDialog}
            firstCardAction={openEditCardDialog}
            secondCardAction={openDeleteCardDialog}
          />
        ))}
      </Grid>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </Box>
  );
}
