import { Grid, Toolbar, Typography } from '@mui/material';

import { Table } from '../../../../components';
import { useTableDataGenerator } from '../../../../utils/hooks';
import styles from './SupplierReport.module.css';
import { MOCK_DATA, SUPPLIER_TOTALS_MOCK_DATA } from './utils/mock';
import supplierTotalsReportTableDataGenerator from './utils/supplier-totals-table-data-generator';
import supplierReportTableDataGenerator from './utils/table-data-generator';

export default function SupplierReport() {
  const tableData = useTableDataGenerator(supplierReportTableDataGenerator, [MOCK_DATA]);

  const supplierTotalsReportTableData = useTableDataGenerator(
    supplierTotalsReportTableDataGenerator,
    [SUPPLIER_TOTALS_MOCK_DATA]
  );

  return (
    <Grid container direction='column' spacing={3} className={styles.container}>
      <Grid item>
        <Typography variant='h5'>Supplier Report</Typography>
      </Grid>
      <Grid item className={styles.tableContainer}>
        <Toolbar className={styles.toolbar}>
          <Typography fontWeight='bold'>Totals</Typography>
        </Toolbar>
        <Table
          totalCount={SUPPLIER_TOTALS_MOCK_DATA.length}
          isLoading={false}
          data={supplierTotalsReportTableData}
          customTableClass={styles.table}
        />
      </Grid>
      <Grid item className={styles.tableContainer}>
        <Table
          totalCount={MOCK_DATA.length}
          isLoading={false}
          data={tableData}
          page={1}
          customTableClass={styles.table}
        />
      </Grid>
    </Grid>
  );
}
