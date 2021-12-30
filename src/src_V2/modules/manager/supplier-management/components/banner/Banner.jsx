import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Box, Tab, Tabs, Button, Typography } from '@mui/material';

import styles from './style.module.css';

export default function Banner({
  currentTab,
  setCurrentTab,
  onSubmit,
  pageName,
  subMenus,
}) {
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
            Add {pageName}
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
          {subMenus.map((menu, index) => (
            <Tab key={index} value={index + 1} label={menu} />
          ))}
        </Tabs>
      </Box>
    </>
  );
}
