import { TabContext, TabList } from '@mui/lab';
import { Box, DialogContent } from '@mui/material';
import * as React from 'react';

import { DetailsDialogStyles } from '../../transportation/dialogs/DialogStyles';
import styles from '../../transportation/dialogs/style.module.css';
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from '../bootstrapDialogTitle/BootstrapDialogTitle';

export default function DetailsDialog({ tabs, tabList, onClose, data: { open } }) {
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
                {Object.values(tabList).map((tab) => tab)}
              </TabList>
            </Box>
            {Object.values(tabs).map((tab) => tab)}
          </TabContext>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
