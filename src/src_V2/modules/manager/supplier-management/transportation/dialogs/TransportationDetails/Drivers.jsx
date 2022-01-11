import { useState } from 'react';
import { TabPanel } from '@mui/lab';
import { Grid } from '@mui/material';
import { InfoCard } from '../../../components';

import styles from '../style.module.css';
import DialogManager from '../Index';

export default function Drivers() {
  const [dialogManagerState, onShowHideDialog] = useState({ open: false });
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'Joe',
      phone: '0908070605',
      languages: [
        { id: 1, label: 'English' },
        { id: 2, label: 'Armenian' },
      ],
      license: [{ id: 1, label: 'A' }],
    },
    {
      id: 2,
      name: 'Mike',
      phone: '0908070605',
      languages: [{ id: 2, label: 'Armenian' }],
      license: ['A', 'B'],
    },
    {
      id: 3,
      name: 'Kim',
      phone: '0908070605',
      languages: [
        { id: 1, label: 'English' },
        { id: 2, label: 'Armenian' },
      ],
      license: [{ id: 1, label: 'A' }],
    },
  ]);

  function deleteRoom(id) {
    setDrivers(drivers.filter((driver) => driver.id !== id));
    onShowHideDialog({ open: false });
  }

  function editRoom(newDriver) {
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
      actions: deleteRoom,
    });
  }

  function openEditCardDialog(id) {
    onShowHideDialog({
      open: true,
      mode: 'edit-driver',
      actions: editRoom,
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
      <TabPanel className={styles.roomsTabPanel} value='2'>
        <Grid className={styles.roomsSection}>
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
