import { Fragment } from 'react';

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

export default function ViewDriverDialog({ data: { state: driver, actions } }) {
  function openDeleteDialog() {
    actions.openDeleteCardDialog(driver.id);
  }

  function openEditDialog() {
    actions.openEditCardDialog(driver.id);
  }

  return (
    <Box className={styles.cardViewContainer}>
      <DialogTitle className={styles.viewDialogTitle}>
        <Typography className={styles.dialogTitle}>Driver / Details</Typography>
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
            <Grid item xs={4.5}>
              <Typography>Name</Typography>
              <Typography className={styles.label}>{driver.name}</Typography>
            </Grid>
            <Grid item xs={3.5}>
              <Typography>Contact Phone</Typography>
              <Typography className={styles.label}>{driver.phone}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>License Type</Typography>
              <Typography className={styles.label}>
                {driver.license.map(({ label }, index) => (
                  <Fragment key={label}>
                    {index ? ', ' : ''}
                    {label}
                  </Fragment>
                ))}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>Languages</Typography>
            <Typography className={styles.label}>
              {driver.languages.map((item, index) => (
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
