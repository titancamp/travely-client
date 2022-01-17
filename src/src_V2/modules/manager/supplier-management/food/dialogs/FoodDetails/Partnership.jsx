import { TabPanel } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import styles from '../style.module.css';

export default function Partnership() {
  return (
    <TabPanel value='3' className={styles.partnership}>
      <Box>
        <Typography className={styles.partnershipSectionTitle}>Details</Typography>
        <Box className={styles.partnershipDetailsSection}>
          <Box className={styles.partnershipSectionBlock}>
            <Box className={styles.datesSection}>
              <CalendarToday className={styles.calendarIcon} />
              <Typography>Sign Date</Typography>
            </Box>
            <Typography>12.03.2021</Typography>
          </Box>
          <Box className={styles.partnershipSectionBlock}>
            <Typography marginBottom='5px'>Expiry Date</Typography>
            <Typography>12.03.2021</Typography>
          </Box>
          <Box className={styles.partnershipSectionBlock}>
            <Button
              variant='contained'
              className={styles.detailsServiceBtns}
              component='span'
            >
              Mariot-Contract 2021
            </Button>
          </Box>
          <Box className={styles.partnershipSectionBlock}>
            <Button
              variant='contained'
              className={styles.detailsServiceBtns}
              component='span'
            >
              Mariot-Related Documents
            </Button>
          </Box>
        </Box>
      </Box>
    </TabPanel>
  );
}
