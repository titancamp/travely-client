import { useEffect } from 'react';
import { Box, Drawer } from '@mui/material';

import styles from './EditDrawer.module.css';
import RowList from '../drawer-content/RowList';

const DrawerList = ({ row, closeHandler }) => (
  <Box className={styles.contentDiv} role="presentation">
    <RowList row={row} onClose={closeHandler} />
  </Box>
);

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

  return (
    <Drawer anchor={anchor} transitionDuration={500} open={isOpened} onClose={handleCloseDrawer}>
      <DrawerList row={clickedRow} closeHandler={handleCloseDrawer} />
    </Drawer>
  );
}
