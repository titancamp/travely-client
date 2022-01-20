import { useEffect, useState } from 'react';
import { Button, Select, IconButton, Box, MenuItem, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Container, Table } from '../../../components';
import PageWrapper from '../account/pageWrapper';
import UserEditContent from './editUser/EditUser';

import { useTableDataGenerator } from '../../../hooks';
import { userManagementTableDataGenerator } from '../reporting/utils/table-data-generator';
import { managerSidebarConfig } from '../config';
import { mockUserManagementData } from './mock/data';
import styles from './styles.module.css';

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
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const [tableData, setTableData] = useState([]);
  const [currentTab, setCurrentTab] = useState('active');
  const filteredData = tableData.filter((user) =>
    currentTab === 'active' ? user.status !== 'Inactive' : user.status === 'Inactive'
  );

  const generatedTableData = useTableDataGenerator(userManagementTableDataGenerator, [
    filteredData.map((row) => ({
      ...row,
      status: <StatusIndicator status={row.status} />,
      editBtn: <EditBtn rowData={row} handleEdit={handleEdit} />,
    })),
  ]);

  const handleChange = (event) => {
    setCurrentTab(event.target.value);
  };

  useEffect(() => {
    setTableData(mockUserManagementData);
  }, [currentTab]);

  return (
    <>
      <Typography className={styles['title']} variant='h6'>
        User Management
      </Typography>
      <Box display='flex' justifyContent='space-between' mt={2.5} mb={3}>
        <Select
          className={styles['select-btn']}
          classes={{
            select: styles['select'],
          }}
          value={currentTab}
          onChange={handleChange}
        >
          <MenuItem value='active'>Active</MenuItem>
          <MenuItem value='inactive'>Inactive</MenuItem>
        </Select>
        <Button
          style={{
            paddingLeft: '64px',
            paddingRight: '64px',
            paddingTop: '8px',
            paddingBottom: '8px',
          }}
          variant='contained'
        >
          Add new user
        </Button>
      </Box>
      <Table
        customTableClass={styles['table']}
        isLoading={false}
        data={generatedTableData}
      />
    </>
  );
}

export default function UserManagement() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <PageWrapper>
        <Routes>
          <Route path='' element={<UserManagementContent />} />
          <Route path='add-user' element={<div>ADD USER</div>} />
          <Route path=':userId' element={<UserEditContent />} />
        </Routes>
      </PageWrapper>
    </Container>
  );
}
