import { createTableColumn, createTableRow } from '../../../../../utils';

const tourReportTableDataGenerator = (entries) => ({
  head: [
    createTableColumn('Tour Id', 'Tour Id'),
    createTableColumn('Tour Name', 'Tour Name'),
    createTableColumn('Tour Status', 'Tour Status'),
    createTableColumn('Participants', 'Participants'),
    createTableColumn('Start date', 'Start date'),
    createTableColumn('End date', 'End date'),
    createTableColumn('Duration', 'Duration'),
    createTableColumn('Partner', 'Partner'),
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
        createTableColumn('tourId', data.id),
        createTableColumn('tourName', data.tourName),
        createTableColumn('tourStatus', data.tourStatus),
        createTableColumn('participants', data.participants),
        createTableColumn('startDate', data.startDate),
        createTableColumn('endDate', data.endDate),
        createTableColumn('duration', data.duration),
        createTableColumn('partner', data.partner),
        createTableColumn('expectedExpenses', data.expectedExpenses),
        createTableColumn('expenses', data.expenses),
        createTableColumn('expectedRevenue', data.expectedRevenue),
        createTableColumn('revenue', data.revenue),
        createTableColumn('expectedProfit', data.expectedProfit),
        createTableColumn('actualProfit', data.actualProfit),
      ],
      data
    )
  ),
});

export default tourReportTableDataGenerator;
