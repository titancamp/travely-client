import { Grid, Typography } from '@mui/material';

import { Table } from '../../../../components';
import { useTableDataGenerator } from '../../../../utils/hooks';
import styles from './ParticipantReport.module.css';
import { MOCK_DATA } from './utils/mock';
import participantReportTableDataGenerator from './utils/table-data-generator';

export default function ParticipantReport() {
  const tableData = useTableDataGenerator(participantReportTableDataGenerator, [
    MOCK_DATA,
  ]);
  return (
    <Grid container direction='column' spacing={3} className={styles.container}>
      <Grid item>
        <Typography variant='h5'>Participant Report</Typography>
      </Grid>
      <Grid item>
        <Table
          totalCount={MOCK_DATA.length}
          isLoading={false}
          data={tableData}
          page={1}
          hasPagination
          customTableClass={styles.table}
        />
      </Grid>
    </Grid>
  );
}
