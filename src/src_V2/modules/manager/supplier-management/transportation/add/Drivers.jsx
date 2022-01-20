import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import DialogManager from '../dialogs/Index';
import { AddCard, InfoCard } from '../../components';

import styles from './style.module.css';

export default function Drivers({ parentRef }) {
  const [drivers, setDrivers] = useState(parentRef.drivers);
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const addDriversToTransportationData = () => (parentRef.drivers = drivers);

  function addDriver(driver) {
    driver.id = drivers.length ? drivers[drivers.length - 1].id + 1 : 1;
    setDrivers([...drivers, driver]);
    onShowHideDialog({ open: false });
  }

  function deleteDriver(id) {
    setDrivers(drivers.filter((driver) => driver.id !== id));
    onShowHideDialog({ open: false });
  }

  function editDriver(newDriver) {
    setDrivers(
      drivers.map((driver) => (newDriver.id === driver.id ? newDriver : driver))
    );
    onShowHideDialog({ open: false });
  }

  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view-driver',
      state: drivers.find((driver) => driver.id === id),
      actions: { openDeleteCardDialog, openEditCardDialog },
    });
  }

  function openAddCardDialog() {
    onShowHideDialog({
      open: true,
      mode: 'add-driver',
      actions: addDriver,
    });
  }

  function openDeleteCardDialog(id) {
    onShowHideDialog({
      open: true,
      state: { id },
      mode: 'delete',
      actions: deleteDriver,
    });
  }

  function openEditCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'edit-driver',
      actions: editDriver,
      state: drivers.find((driver) => driver.id === id),
    });
  }

  useEffect(addDriversToTransportationData, [drivers]);

  return (
    <Box className={styles.content}>
      <Grid container spacing={1}>
        <AddCard
          title='Drivers'
          buttonText='ADD DRIVER'
          tooltipKeyWord={'driver'}
          disabled={drivers.length === 50}
          onOpenDialog={openAddCardDialog}
        />
        {drivers.map((driver) => {
          let license = driver.license?.reduce(
            (prevType, { label }, index) => prevType + (index ? ', ' : '') + label,
            ''
          );

          if (license?.length) {
            license += ' Category';
          }

          let languages = driver.languages?.reduce(
            (prev, { label }, index) => prev + (index ? ' / ' : '') + label,
            ''
          );

          return (
            <InfoCard
              id={driver.id}
              key={driver.id}
              sectionData={{
                1: {
                  value: license,
                  label: '',
                },
                2: {
                  value: driver.name,
                  label: null,
                },
                3: {
                  value: languages,
                  label: '',
                },
                4: {
                  value: driver.phone,
                  label: '',
                },
              }}
              areaAction={openViewCardDialog}
              firstCardAction={openEditCardDialog}
              secondCardAction={openDeleteCardDialog}
            />
          );
        })}
      </Grid>
      <DialogManager data={dialogManagerState} onShowHideDialog={onShowHideDialog} />
    </Box>
  );
}
