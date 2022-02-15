import { createTableColumn, createTableRow } from '../../../../../utils';

const participantReportTableDataGenerator = (entries) => ({
  head: [
    createTableColumn('Supplier Name', 'Supplier Name'),
    createTableColumn('Supplier Type', 'Supplier Type'),
    createTableColumn('Subtype', 'Subtype'),
    createTableColumn('Location', 'Location'),
    createTableColumn('Expected Expenses', 'Expected Expenses'),
    createTableColumn('Actual Expenses', 'Actual Expenses'),
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
      ],
      data
    )
  ),
});

export default participantReportTableDataGenerator;
