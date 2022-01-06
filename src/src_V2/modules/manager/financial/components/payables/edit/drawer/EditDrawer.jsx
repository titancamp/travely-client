import { useEffect } from 'react';
import { Box, Drawer } from '@mui/material';

import styles from './EditDrawer.module.css';
import RowList from '../drawer-content/RowList';

export default function EditDrawer({ drawerState, clickedRow, isOpenedChangeHandler }) {
  const { isOpened, drawerEvent } = drawerState;
  const anchor = 'right';

  useEffect(() => {
    toggleDrawer(isOpened);
  }, [isOpened]);

  const toggleDrawer = (isOpened) => {
    if (
      drawerEvent?.type === 'keydown' &&
      (drawerEvent?.key === 'Tab' || drawerEvent?.key === 'Shift')
    ) {
      return;
    }

    isOpenedChangeHandler(isOpened);
  };

  const handleCloseDrawer = () => {
    toggleDrawer(false);
    isOpenedChangeHandler(false);
  };

  const DrawerList = () => (
    <Box
      className={styles.contentDiv}
      role="presentation"
      onClick={handleCloseDrawer}
      onKeyDown={handleCloseDrawer}
    >
      <RowList row={clickedRow} />
    </Box>
  );

  return (
    <Drawer anchor={anchor} open={isOpened} onClose={handleCloseDrawer}>
      <DrawerList />
    </Drawer>
  );
}
