import { createTableColumn, createTableRow } from '../../../../utils';

export const tourReportTableDataGenerator = (entries) => ({
  head: [
    createTableColumn('Tour Name', 'Tour Name'),
    createTableColumn('Participants', 'Participants'),
    createTableColumn('Expenses', 'Expenses'),
    createTableColumn('Revenue', 'Revenue'),
  ],
  rows: entries.map((data) =>
    createTableRow(
      data.id,
      [
        createTableColumn('tourName', data.tourName),
        createTableColumn('participants', data.participants),
        createTableColumn('expenses', data.expenses),
        createTableColumn('revenue', data.revenue),
      ],
      data
    )
  ),
});

export const userManagementTableDataGenerator = (entries) => ({
  head: [
    createTableColumn('Name', 'Name'),
    createTableColumn('User Position', 'User Position'),
    createTableColumn('Email', 'Email'),
    createTableColumn('Phone Number', 'Phone Number'),
    createTableColumn('Status', 'Status'),
    createTableColumn('editBtn', '', '', { width: 66 }),
  ],
  rows: entries.map((data) =>
    createTableRow(
      data.id,
      [
        createTableColumn('name', data.name),
        createTableColumn('position', data.position),
        createTableColumn('email', data.email),
        createTableColumn('phone', data.phone),
        createTableColumn('status', data.status),
        createTableColumn('editBtn', data.editBtn, '', { width: 66 }),
      ],
      data
    )
  ),
});
