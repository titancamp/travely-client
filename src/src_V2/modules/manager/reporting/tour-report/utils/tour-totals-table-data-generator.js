import { createTableColumn, createTableRow } from '../../../../../utils';

const tourReportTotalsTableDataGenerator = (entries) => ({
  head: [
    createTableColumn('Tours', 'Tours'),
    createTableColumn('Expenses', 'Expenses'),
    createTableColumn('Revenue', 'Revenue'),
  ],
  rows: entries.map((data) =>
    createTableRow(
      data.id,
      [
        createTableColumn('tours', data.tours),
        createTableColumn('expenses', data.expenses),
        createTableColumn('revenue', data.revenue),
      ],
      data
    )
  ),
});

export default tourReportTotalsTableDataGenerator;
