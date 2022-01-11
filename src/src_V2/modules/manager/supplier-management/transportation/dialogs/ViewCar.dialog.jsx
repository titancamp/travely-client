import {
  Box,
  Grid,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import styles from './style.module.css';

export default function ViewCarDialog({ data: { state: car, actions } }) {
  function openDeleteDialog() {
    actions.openDeleteCardDialog(car.id);
  }

  function openEditDialog() {
    actions.openEditCardDialog(car.id);
  }

  return (
    <Box className={styles.cardViewContainer}>
      <DialogTitle className={styles.viewDialogTitle}>
        <Typography className={styles.dialogTitle}>Car / Details</Typography>
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
          <Grid container item xs={11} spacing={1} mb={3}>
            <Grid item xs={4}>
              <Typography>Model</Typography>
              <Typography className={styles.label}>{car.model}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Color</Typography>
              <Typography className={styles.label}>{car.color}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Plate Number</Typography>
              <Typography className={styles.label}>{car.plate}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={11} spacing={1} mb={3}>
            <Grid item xs={3}>
              <Typography>Color</Typography>
              <Typography className={styles.label}>{car.seats}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Number of car seats</Typography>
              <Typography className={styles.label}>{car.carSeats}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Box>
  );
}
