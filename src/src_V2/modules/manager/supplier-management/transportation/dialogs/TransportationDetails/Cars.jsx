import { TabPanel } from '@mui/lab';
import { Grid } from '@mui/material';
import { useState } from 'react';

import { InfoCard } from '../../../components';
import { CarsConstants } from '../../constants';
import DialogManager from '../Index';
import styles from '../style.module.css';

export default function Cars() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const [cars, setCars] = useState(CarsConstants);

  function deleteCar(id) {
    setCars(cars.filter((car) => car.id !== id));
    onShowHideDialog({ open: false });
  }

  function editCar(newCar) {
    setCars(cars.map((car) => (newCar.id === car.id ? newCar : car)));
    onShowHideDialog({ open: false });
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

  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view-car',
      state: cars.find((car) => car.id === id),
      actions: { openDeleteCardDialog, openEditCardDialog },
    });
  }

  return (
    <>
      <TabPanel className={styles.carsTabPanel} value='3'>
        <Grid className={styles.carsSection}>
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
