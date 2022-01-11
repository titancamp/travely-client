import * as React from 'react';
import { useState } from 'react';
import { TabPanel } from '@mui/lab';
import { Grid } from '@mui/material';
import { InfoCard } from '../../../components';

import styles from '../style.module.css';
import DialogManager from '../Index';

export default function Drivers() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const [cars, setCars] = useState([
    {
      id: 1,
      carSeats: '33',
      color: 'Red',
      model: 'BMW',
      plate: 'AA6787AAA',
      seats: '44',
    },
    {
      id: 2,
      carSeats: 'Opel',
      color: 'Green',
      model: 'Astra',
      plate: '77UU777',
      seats: '88',
    },
    {
      id: 3,
      carSeats: '3',
      color: 'Blue',
      model: 'Kia',
      plate: '22LL999',
      seats: '32',
    },
  ]);

  function deleteRoom(id) {
    setCars(cars.filter((driver) => driver.id !== id));
    onShowHideDialog({ open: false });
  }

  function editRoom(newDriver) {
    setCars(cars.map((driver) => (newDriver.id === driver.id ? newDriver : driver)));
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
      mode: 'edit-car',
      actions: editRoom,
      state: cars.find((driver) => driver.id === id),
    });
  }

  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view-car',
      state: cars.find((driver) => driver.id === id),
      actions: { openDeleteCardDialog, openEditCardDialog },
    });
  }

  return (
    <>
      <TabPanel className={styles.roomsTabPanel} value='3'>
        <Grid className={styles.roomsSection}>
          {cars.map((car) => (
            <InfoCard
              id={car.id}
              key={car.id}
              sectionData={{
                1: {
                  value: 'Red',
                  label: null,
                },
                2: {
                  value: 'Honda Accord',
                  label: null,
                },
                3: {
                  value: 'Seats: 4 / Car Seats: 2',
                  label: null,
                },
                4: {
                  value: '00 AB 000',
                  label: null,
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
