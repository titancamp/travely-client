import { createTableColumn, createTableRow } from '../../../../utils';

const userManagementTableDataGenerator = (entries) => ({
  head: [
    createTableColumn('Name', 'Name'),
    createTableColumn('User Position', 'User Position'),
    createTableColumn('Email', 'Email'),
    createTableColumn('Phone Number', 'Phone Number'),
    createTableColumn('Status', 'Status', '', { width: 160 }),
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
        createTableColumn('status', data.status, '', { width: 160 }),
        createTableColumn('editBtn', data.editBtn, '', { width: 66 }),
      ],
      data
    )
  ),
});

export default userManagementTableDataGenerator;
