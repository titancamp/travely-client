import { createTableColumn, createTableRow } from '../../../../../utils';

const participantReportTableDataGenerator = (entries) => ({
  head: [
    createTableColumn('Supplier Name', 'Supplier Name'),
    createTableColumn('Supplier Type', 'Supplier Type'),
    createTableColumn('Supplier Subtype', 'Supplier Subtype'),
    createTableColumn('Location', 'Location'),
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
        createTableColumn('supplierName', data.supplierName),
        createTableColumn('supplierType', data.supplierType),
        createTableColumn('subType', data.subType),
        createTableColumn('location', data.location),
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

export default participantReportTableDataGenerator;
