import { useEffect, useState } from 'react';
import { Button, Select, IconButton, Box, MenuItem, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Table } from '../../../components';
import PageWrapper from '../account/pageWrapper';
import UserConfigContent from './UserConfig/UserConfig';

import { useTableDataGenerator } from '../../../utils/hooks';
import userManagementTableDataGenerator from './utils/table-data-generator';
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

  const handleAddUser = () => {
    navigate('add-user');
  };

  useEffect(() => {
    setTableData(mockUserManagementData);
  }, [currentTab]);

  return (
    <div className={styles['content']}>
      <Typography className={styles['title']} variant='h6'>
        User Management
      </Typography>
      <div className={styles['toolbar']}>
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
        <Button onClick={handleAddUser} className={styles['add-btn']} variant='contained'>
          Add new user
        </Button>
      </div>
      <Table
        customTableClass={styles['table']}
        isLoading={false}
        data={generatedTableData}
      />
    </div>
  );
}

export default function UserManagement() {
  return (
    <PageWrapper>
      <Routes>
        <Route path='' element={<UserManagementContent />} />
        <Route path='add-user' element={<UserConfigContent newUser />} />
        <Route path=':userId' element={<UserConfigContent />} />
      </Routes>
    </PageWrapper>
  );
}
