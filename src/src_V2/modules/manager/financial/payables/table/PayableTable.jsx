import { Box, Paper } from '@mui/material';
import { useState } from 'react';

import { StickyTable } from '../../components';
import { payableColumns } from '../../constants';
import EditDrawer from '../edit/drawer/EditDrawer';

export default function PayableTable({ payables, total, payablesLoading }) {
  const [drawerState, setDrawerState] = useState({
    isOpened: false,
    drawerEvent: null,
  });
  const [clickedRow, setClickedRow] = useState(null);

  const handleDrawerOpen = (opened) => {
    if (!opened) {
      setClickedRow(null);
    }

    setDrawerState({
      ...drawerState,
      isOpened: opened,
    });
  };

  return (
    <Box>
      <Paper>
        <StickyTable
          data={payables}
          uniqueKey='paymentId'
          columns={payableColumns()}
          tableLoading={payablesLoading}
          showStickyFooter={true}
          stickyFooterData={total}
          handleClickedRow={setClickedRow}
          handleDrawerState={setDrawerState}
        />
      </Paper>

      {!!clickedRow && (
        <EditDrawer
          drawerState={drawerState}
          clickedRow={clickedRow}
          isOpenedChangeHandler={handleDrawerOpen}
        />
      )}
    </Box>
  );
}
