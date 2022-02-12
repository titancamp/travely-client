import { Grid, Toolbar, Typography } from '@mui/material';

import { Table } from '../../../../components';
import { useTableDataGenerator } from '../../../../utils/hooks';
import styles from './TourReport.module.css';
import { TOUR_REPORT_MOCK_DATA, TOUR_REPORT_TOTALS_MOCK_DATA } from './utils/mock';
import tourReportTableDataGenerator from './utils/tour-table-data-generator';
import tourReportTotalsTableDataGenerator from './utils/tour-totals-table-data-generator';

export default function TourReport() {
  const tableData = useTableDataGenerator(tourReportTableDataGenerator, [
    TOUR_REPORT_MOCK_DATA,
  ]);

  const tourTotalsReportTableData = useTableDataGenerator(
    tourReportTotalsTableDataGenerator,
    [TOUR_REPORT_TOTALS_MOCK_DATA]
  );

  return (
    <Grid container direction='column' spacing={3} className={styles.container}>
      <Grid item>
        <Typography variant='h5'>Tour Report</Typography>
      </Grid>
      <Grid item>
        <Toolbar className={styles.toolbar}>
          <Typography fontWeight='bold'>Totals</Typography>
        </Toolbar>
        <Table
          totalCount={TOUR_REPORT_TOTALS_MOCK_DATA.length}
          isLoading={false}
          data={tourTotalsReportTableData}
          customTableClass={styles.table}
        />
      </Grid>
      <Grid item>
        <Table
          totalCount={TOUR_REPORT_MOCK_DATA.length}
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
