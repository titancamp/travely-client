import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Box, Tab, Tabs, Button, Typography } from '@mui/material';

import styles from './style.module.css';

export default function Banner({ currentTab, setCurrentTab, onSubmit }) {
  const navigate = useNavigate();

  function handleChange(event, newValue) {
    setCurrentTab(newValue);
  }

  function navigateBack() {
    navigate(-1);
  }

  return (
    <>
      <Box className={styles.actionBanner}>
        <Box className={styles.contentLeft}>
          <IconButton className={styles.backArrowIcon} onClick={navigateBack}>
            <ArrowBack fontSize='medium' />
          </IconButton>
          <Typography variant='h5' className={styles.title}>
            Add Accommodation
          </Typography>
        </Box>
        <Box>
          <Button variant='contained' className={styles.cancelBtn} onClick={navigateBack}>
            CANCEL
          </Button>
          <Button variant='contained' className={styles.addBtn} onClick={onSubmit}>
            ADD
          </Button>
        </Box>
      </Box>
      <Box className={styles.tab}>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab value={1} label='MAIN INFO' />
          <Tab value={2} label='ROOMS' />
          <Tab value={3} label='CONTACT' />
          <Tab value={4} label='PARTNERSHIP' />
        </Tabs>
      </Box>
    </>
  );
}
