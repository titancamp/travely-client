import { Table } from '../../../components';
import tourReportTableDataGenerator from './utils/table-data-generator';
import { useTableDataGenerator } from '../../../utils/hooks';

import { Typography } from '@mui/material';

const MOCK_DATA = [
  {
    id: 124,
    tourName: 'First Tour',
    participants: 12,
    expenses: 123,
    revenue: '10000 AMD',
  },
];

export default function Reporting() {
  const tableData = useTableDataGenerator(tourReportTableDataGenerator, [MOCK_DATA]);

  return (
    <>
      <Typography>Reporting</Typography>
      <Table
        totalCount={MOCK_DATA.length}
        isLoading={false}
        data={tableData}
        page={1}
        hasPagination
      />
    </>
  );
}
