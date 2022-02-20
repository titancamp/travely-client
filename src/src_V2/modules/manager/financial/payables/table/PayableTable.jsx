import { Box, Paper } from '@mui/material';
import { useState } from 'react';

import { StickyTable } from '../../components';
import { payableColumns, stickyFooterColumns } from '../../constants';
import { getComparator } from '../../utils';
import EditDrawer from '../edit-drawer/EditDrawer';

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
          stickyFooterColumns={stickyFooterColumns()}
          stickyFooterData={total}
          handleClickedRow={setClickedRow}
          handleDrawerState={setDrawerState}
          comparator={getComparator}
          showCheckbox={false}
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
