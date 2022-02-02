import { TabContext, TabList } from '@mui/lab';
import { Box, DialogContent, Tab } from '@mui/material';
import * as React from 'react';

import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from '../../../components/bootstrapDialogTitle/BootstrapDialogTitle';
import MainInfo from '../../../components/dialogs/MainInfo';
import Partnership from '../../../components/dialogs/Partnership';
import { DetailsDialogStyles } from '../../../transportation/dialogs/DialogStyles';
import styles from '../style.module.css';
import Attributes from './Attributes';

//TODO make this component sharable
export default function ActivitiesDetailsDialog({ onClose, data: { open } }) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BootstrapDialog onClose={onClose} open={open} styles={DetailsDialogStyles}>
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
              <TabList onChange={handleChange}>
                <Tab label='MAIN INFO' value='1' />
                <Tab label='ATTRIBUTES' value='2' />
                <Tab label='PARTNERSHIP' value='3' />
              </TabList>
            </Box>
            <MainInfo />
            <Attributes />
            <Partnership tabNumber='3' />
          </TabContext>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
