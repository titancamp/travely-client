import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';

import styles from './style.module.css';

export default function ViewRoomDialog({ data: { state: room, actions } }) {
  function openDeleteDialog() {
    actions.openDeleteCardDialog(room.id);
  }

  function openEditDialog() {
    actions.openEditCardDialog(room.id);
  }

  return (
    <Box>
      <DialogTitle className={styles.viewDialogTitle}>
        <Typography className={styles.dialogTitle}>
          {room.type.label} / Details
        </Typography>
        <Box className={`${styles.cardActions} ${styles.rightAligned}`}>
          <IconButton onClick={openEditDialog}>
            <Edit />
          </IconButton>
          <IconButton onClick={openDeleteDialog}>
            <Delete />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid container item xs={8} spacing={2} mb={3}>
            <Grid item xs={5}>
              <Typography>Type</Typography>
              <Typography className={styles.roomLabel}>{room.type.label}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Quantity</Typography>
              <Typography className={styles.roomLabel}>{room.quantity}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Price</Typography>
              <Typography className={styles.roomLabel}>
                {room.price} {room.price && 'AMD'}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={8} spacing={2} mb={3}>
            <Grid item xs={5}>
              <Typography>Number of beds</Typography>
              <Typography className={styles.roomLabel}>{room.beds}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography>additional beds</Typography>
              <Typography className={styles.roomLabel}>{room.additionalBeds}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>Services</Typography>
            <Typography className={styles.roomLabel}>
              {room.services.map((item, index) => (
                <Fragment key={index}>
                  {index ? ' / ' : ''}
                  {item.label}
                </Fragment>
              ))}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Box>
  );
}
