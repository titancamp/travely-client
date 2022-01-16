/* eslint-disable */

import { Edit } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
// import { Box } from '@mui/system';
import { Container, Table } from '../../../components';
import { useTableDataGenerator } from '../../../hooks';
import { managerSidebarConfig } from '../config';
import { userManagementTableDataGenerator } from '../reporting/utils/table-data-generator';
import styles from './styles.module.css';

const mockData = [
  {
    id: 0,
    name: 'Theresa Webb',
    position: 'Tour Manager',
    email: 'chrwin@me.com',
    phone: '(319) 555-0115',
    status: 'Pending',
  },
  {
    id: 1,
    name: 'Wade Warren',
    position: 'Tour Manager',
    email: 'shaffei@me.com',
    phone: '(319) 555-0115',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Brooklyn Simmons',
    position: 'Tour Manager',
    email: 'dbrobins@outlook.com',
    phone: '(319) 555-0115',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Ronald Richards',
    position: 'Tour Manager',
    email: 'iapetus@aol.com',
    phone: '(319) 555-0115',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Brooklyn Simmons',
    position: 'Tour Manager',
    email: 'seasweb@me.com',
    phone: '(319) 555-0115',
    status: 'Active',
  },
];

const EditBtn = ({ rowData, handleEdit }) => (
  <span>
    <IconButton onClick={() => handleEdit(rowData.id)}>
      <Edit />
    </IconButton>
  </span>
);

const StatusIndicator = ({ status }) => {
  const colorsObj = {
    active: '#4CAF50',
    pending: '#C77700',
    inactive: 'rgba(0, 0, 0, 0.54)',
  };

  return (
    <Box component='span' color={status ? colorsObj[status.toLowerCase()] : ''}>
      {status}
    </Box>
  );
};

function UserManagementContent() {
  const handleEdit = (id) => {
    console.log(id);
  };

  const tableData = useTableDataGenerator(userManagementTableDataGenerator, [
    mockData.map((row) => ({
      ...row,
      status: <StatusIndicator status={row.status} />,
      editBtn: <EditBtn rowData={row} handleEdit={handleEdit} />,
    })),
  ]);

  return (
    <div>
      <Typography className={styles['title']} variant='h6'>
        My Account
      </Typography>
      <Table isLoading={false} data={tableData} />
    </div>
  );
}

export default function UserManagement() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <UserManagementContent />
    </Container>
  );
}
