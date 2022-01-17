import { useEffect, useState } from 'react';
import { Button, Select, IconButton, Box, MenuItem, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';

import { Container, Table } from '../../../components';
import PageWrapper from '../account/pageWrapper';

import { useTableDataGenerator } from '../../../hooks';
import { userManagementTableDataGenerator } from '../reporting/utils/table-data-generator';
import { managerSidebarConfig } from '../config';
import { mockData } from './mock/data';
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
  const handleEdit = () => {
    // Redirect to edit page
  };

  const [tableData, setTableData] = useState([]);

  const generatedTableData = useTableDataGenerator(userManagementTableDataGenerator, [
    tableData.map((row) => ({
      ...row,
      status: <StatusIndicator status={row.status} />,
      editBtn: <EditBtn rowData={row} handleEdit={handleEdit} />,
    })),
  ]);

  const [currentTab, setCurrentTab] = useState('active');

  const handleChange = (event) => {
    setCurrentTab(event.target.value);
  };

  useEffect(() => {
    setTableData(mockData[currentTab]);
  }, [currentTab]);

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}

export default function UserManagement() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <UserManagementContent />
    </Container>
  );
}
