import * as React from 'react';
import { TabList, TabContext } from '@mui/lab';
import { Box, Tab, DialogContent } from '@mui/material';
import Cars from './Cars';
import Drivers from './Drivers';
import MainInfo from './MainInfo';
import Partnership from '../../../components/dialogs/Partnership';
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from '../../../components/bootstrapDialogTitle/BootstrapDialogTitle';

import styles from '../style.module.css';

export default function TransportationDetailsDialog({ onClose, data: { open } }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <BootstrapDialogTitle
        onClose={onClose}
        className={`${styles.container} ${styles.header}`}
      >
        Agency / Agency Name Example
      </BootstrapDialogTitle>
      <DialogContent dividers className={styles.container}>
        <Box className={styles.dialogMenu}>
          <TabContext value={value}>
            <Box
              className={styles.headerMenu}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='MAIN INFO' value='1' />
                <Tab label='DRIVERS' value='2' />
                <Tab label='CARS' value='3' />
                <Tab label='PARTNERSHIP' value='4' />
              </TabList>
            </Box>
            <MainInfo />
            <Drivers />
            <Cars />
            <Partnership tabNumber='4' />
          </TabContext>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
