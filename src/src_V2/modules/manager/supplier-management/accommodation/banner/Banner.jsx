import { Box, Tab, Tabs, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import styles from './style.module.css';

export default function Banner({ currentTab, setCurrentTab }) {
  function handleChange(event, newValue) {
    setCurrentTab(newValue);
  }

  return (
    <>
      <Box className={styles.actionBanner}>
        <Box className={styles.contentLeft}>
          <ArrowBack fontSize="medium" />
          <Typography variant="h5" className={styles.title}>
            Add Accommodation
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" className={styles.cancelBtn}>
            CANCEL
          </Button>
          <Button variant={'contained'} className={styles.addBtn}>
            ADD
          </Button>
        </Box>
      </Box>
      <Box className={styles.tab}>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab value={1} label="MAIN INFO" />
          <Tab value={2} label="ROOMS" />
          <Tab value={3} label="CONTACT" />
          <Tab value={4} label="PARTNERSHIP" />
        </Tabs>
      </Box>
    </>
  );
}
