import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import DialogManager from '../dialogs/Index';
import { AddCard, InfoCard } from '../../components';

import styles from './style.module.css';

export default function Cars({ parentRef }) {
  const [cars, setCars] = useState(parentRef.cars);
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const addCarsToTransportationData = () => (parentRef.cars = cars);

  function addCar(car) {
    car.id = cars.length ? cars[cars.length - 1].id + 1 : 1;
    setCars([...cars, car]);
    onShowHideDialog({ open: false });
  }

  function deleteCar(id) {
    setCars(cars.filter((car) => car.id !== id));
    onShowHideDialog({ open: false });
  }

  function editCar(newCar) {
    setCars(cars.map((car) => (newCar.id === car.id ? newCar : car)));
    onShowHideDialog({ open: false });
  }

  function openAddCardDialog() {
    onShowHideDialog({
      open: true,
      mode: 'add-car',
      actions: addCar,
    });
  }

  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view-car',
      state: cars.find((car) => car.id === id),
      actions: { openDeleteCardDialog, openEditCardDialog },
    });
  }

  function openDeleteCardDialog(id) {
    onShowHideDialog({
      open: true,
      state: { id },
      mode: 'delete',
      actions: deleteCar,
    });
  }

  function openEditCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'edit-car',
      actions: editCar,
      state: cars.find((car) => car.id === id),
    });
  }

  useEffect(addCarsToTransportationData, [cars]);

  return (
    <Box className={styles.content}>
      <Grid container spacing={1}>
        <AddCard
          title='Cars'
          buttonText='ADD CAR'
          tooltipKeyWord={'car'}
          disabled={cars.length === 50}
          onOpenDialog={openAddCardDialog}
        />
        {cars.map((car) => (
          <InfoCard
            id={car.id}
            key={car.id}
            sectionData={{
              1: {
                value: car.color,
                label: '',
              },
              2: {
                value: car.model,
                label: null,
              },
              3: {
                value: car.seats + (car.carSeats ? ' / Car Seats: ' + car.carSeats : ''),
                label: 'Seats: ',
              },
              4: {
                value: car.plate,
                label: '',
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
