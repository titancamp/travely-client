import { useState } from 'react';
import { Box, Card, Grid, Button, IconButton, Typography, CardContent } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { Edit, Delete } from '@mui/icons-material';

import DialogManager from '../dialogs/Index';
import styles from './style.module.css';

export default function Rooms() {
  const [temporaryData] = useState([]);
  const [dialogManagerState, onShowHideDialog] = useState({
    id: null,
    mode: '',
    open: false,
  });

  return (
    <Box className={styles.roomContent}>
      <Grid container spacing={1}>
        <AddRoomCard onOpenDialog={onShowHideDialog} />
        {temporaryData.map((room) => (
          <RoomInfoCard room={room} key={room.id} onOpenDialog={onShowHideDialog} />
        ))}
      </Grid>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </Box>
  );
}

//TODO cards should be reusable

function RoomInfoCard({ room, onOpenDialog }) {
  function openViewCardDialog() {
    onOpenDialog({
      open: true,
      id: room.id,
      mode: 'view',
    });
  }

  return (
    <Grid className={styles.gridItem} item xs={3}>
      <Card className={styles.card}>
        <CardContent>
          <Typography className={styles.detailsInfo}>Qty: {room.quantity}</Typography>
          <Typography variant="h6" className={styles.title}>
            {room.type}
          </Typography>
          <Typography className={styles.detailsInfo}>Beds: {room.beds}</Typography>
          <Typography component="p" className={styles.price}>
            {room.price} AMD
          </Typography>
        </CardContent>
        <Box className={`${styles.cardActions} ${styles.rightAligned}`}>
          <IconButton onClick={openViewCardDialog}>
            <Edit className={styles.cardButton} />
          </IconButton>
          <IconButton color="primary" onClick={openViewCardDialog}>
            <Delete className={styles.cardButton} />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );
}

function AddRoomCard({ onOpenDialog }) {
  function openAddCardDialog() {
    onOpenDialog({
      mode: 'add',
      open: true,
    });
  }

  return (
    <Grid className={styles.gridItem} item xs={3}>
      <Card className={`${styles.addCard} ${styles.card}`}>
        <CardContent>
          <Typography className={styles.title} variant="h5">
            Rooms
          </Typography>
          <Typography className={styles.subTitle}>
            Add Button bellow to add rooms to your accommodation
          </Typography>
        </CardContent>
        <Box className={styles.cardActions}>
          <Button className={styles.addButton} onClick={openAddCardDialog}>
            ADD ROOM
            <AddCircle />
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
