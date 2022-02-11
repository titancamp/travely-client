import { createTableColumn, createTableRow } from '../../../../../utils';

const supplierTotalsReportTableDataGenerator = (entries) => ({
  head: [
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
        createTableColumn('expectedExpenses', data.expectedExpenses),
        createTableColumn('actualExpenses', data.actualExpenses),
        createTableColumn('expectedRevenue', data.expectedRevenue),
        createTableColumn('actualRevenue', data.actualRevenue),
        createTableColumn('expectedProfit', data.expectedProfit),
        createTableColumn('actualProfit', data.actualProfit),
      ],
      data
    )
  ),
});

export default supplierTotalsReportTableDataGenerator;
