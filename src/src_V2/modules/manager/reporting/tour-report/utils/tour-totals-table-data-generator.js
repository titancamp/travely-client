import { createTableColumn, createTableRow } from '../../../../../utils';

const tourReportTotalsTableDataGenerator = (entries) => ({
  head: [
    createTableColumn('Tours', 'Tours'),
    createTableColumn('Expected Expenses', 'Expected Expenses'),
    createTableColumn('Actual Expenses', 'Actual Expenses'),
    createTableColumn('Expected Revenue', 'Expected Revenue'),
    createTableColumn('Actual Revenue', 'Actual Revenue'),
    createTableColumn('Expected Profit', 'Expected Profit'),
    createTableColumn('Actual Profit', 'Actual Profit'),
  ],
  rows: entries.map((data) =>
    createTableRow(
      data.id,
      [
        createTableColumn('Tours', data.tours),
        createTableColumn('Expected Expenses', data.expectedExpenses),
        createTableColumn('Actual Expenses', data.actualExpenses),
        createTableColumn('Expected Revenue', data.expectedRevenue),
        createTableColumn('Actual Revenue', data.actualRevenue),
        createTableColumn('Expected Profit', data.expectedProfit),
        createTableColumn('Actual Profit', data.actualProfit),
      ],
      data
    )
  ),
});

export default tourReportTotalsTableDataGenerator;
