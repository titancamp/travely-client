import * as React from 'react';
import { TabList, TabContext } from '@mui/lab';
import { Box, Tab, DialogContent } from '@mui/material';
import Rooms from './Rooms';
import MainInfo from './MainInfo';
import Partnership from '../../../components/dialogs/Partnership';
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from '../../../components/bootstrapDialogTitle/BootstrapDialogTitle';

import styles from '../style.module.css';

export default function AccommodationDetailsDialog({ onClose, data: { open } }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <BootstrapDialogTitle
        id='customized-dialog-title'
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
                <Tab label='ROOMS' value='2' />
                <Tab label='PARTNERSHIP' value='3' />
              </TabList>
            </Box>
            <MainInfo />
            <Rooms />
            <Partnership tabNumber='3' />
          </TabContext>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
