import { TabPanel } from '@mui/lab';
import { Grid } from '@mui/material';
import { useState } from 'react';

import { InfoCard } from '../../../components';
import { DriversConstants } from '../../constants';
import DialogManager from '../Index';
import styles from '../style.module.css';

export default function Drivers() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const [drivers, setDrivers] = useState(DriversConstants);

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

  function openViewCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'view-driver',
      state: drivers.find((driver) => driver.id === id),
      actions: { openDeleteCardDialog, openEditCardDialog },
    });
  }

  return (
    <>
      <TabPanel className={styles.driversTabPanel} value='2'>
        <Grid className={styles.driversSection}>
          {drivers.map((driver) => (
            <InfoCard
              id={driver.id}
              key={driver.id}
              sectionData={{
                1: {
                  value: null,
                  label: 'A class ',
                },
                2: {
                  value: 'Cameron Williamson',
                  label: null,
                },
                3: {
                  value: 'Armenian / Russian',
                  label: null,
                },
                4: {
                  value: '(406) 555-0120',
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