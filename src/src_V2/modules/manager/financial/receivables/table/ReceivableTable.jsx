import { Box, Paper } from '@mui/material';
import { useState } from 'react';

import { StickyTable } from '../../components';
import { receivableColumns } from '../../constants';
import { getComparator } from '../../utils';
import EditDrawer from '../edit-drawer/EditDrawer';

export default function ReceivableTable({ receivables, receivablesLoading }) {
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
          data={receivables}
          uniqueKey='receivableId'
          columns={receivableColumns()}
          tableLoading={receivablesLoading}
          handleClickedRow={setClickedRow}
          handleDrawerState={setDrawerState}
          comparator={getComparator}
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
