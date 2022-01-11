import { TabPanel } from '@mui/lab';
import { Box, Button, Grid, Typography } from '@mui/material';

import styles from '../style.module.css';

export default function Partnership() {
  return (
    <TabPanel value='3' className={styles.partnership}>
      <Box>
        <Typography className={styles.partnershipSectionTitle}>Details</Typography>
        <Box className={styles.partnershipDetailsSection}>
          <Box className={styles.partnershipSectionBlock}>
            <Typography>Sign Date</Typography>
            <Typography>12.03.2021</Typography>
          </Box>
          <Box className={styles.partnershipSectionBlock}>
            <Typography>Expiry Date</Typography>
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
      <Grid className={styles.dashedBorder} />
      <Box>
        <Typography className={styles.partnershipSectionTitle}>Details</Typography>
        <Box className={styles.partnershipDetailsSection}>
          <Box className={styles.partnershipSectionBlock}>
            <Typography>Percentage</Typography>
            <Typography> 10%</Typography>
          </Box>
          <Box className={styles.partnershipSectionBlock}>
            <Typography>Fixed Price</Typography>
            <Typography>10000 AMD</Typography>
          </Box>
        </Box>
      </Box>
    </TabPanel>
  );
}
