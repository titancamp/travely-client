import { Grid, Typography } from '@mui/material';
import {
  Email,
  LocalPhone,
  LocationOn,
  Person,
  AccessTime,
  AttachMoney,
} from '@mui/icons-material';
import { TabPanel } from '@mui/lab';

import styles from '../style.module.css';
//TODO they could be some design changes after fetching the real data
export default function MainInfo() {
  return (
    <TabPanel className={styles.mainInfo} value='1'>
      <Grid className={styles.itemBlock}>
        <Grid className={styles.infoItem}>
          <LocationOn className={styles.detailsIcon} />
          <Typography>Address</Typography>
        </Grid>
        <Typography>
          4/1, Tandzaghpyur Street 2, Tsaghkadzor 2310 / Tsaghkadzor / Kotayq{' '}
        </Typography>
      </Grid>
      <Grid className={styles.itemBlock}>
        <Grid className={styles.infoItem}>
          <LocalPhone className={styles.detailsIcon} />
          <Typography>Phone</Typography>
        </Grid>
        <Typography> +374 11 11 11 11 </Typography>
      </Grid>
      <Grid className={styles.itemBlock}>
        <Grid className={styles.infoItem}>
          <Person className={styles.detailsIcon} />
          <Typography>Contact Person</Typography>
        </Grid>
        <Typography>John Doe</Typography>
      </Grid>
      <Grid className={styles.itemBlock}>
        <Grid className={styles.infoItem}>
          <Email className={styles.detailsIcon} />
          <Typography>Contact Email</Typography>
        </Grid>
        <Typography>customer.care@marriott.com</Typography>
      </Grid>
      <Grid className={styles.itemBlock}>
        <Grid className={styles.infoItem}>
          <AccessTime className={styles.detailsIcon} />
          <Typography>Working Hours</Typography>
        </Grid>
        <Typography>12:00 / 2:00 M-F, 2:00 / 12:00 S, S</Typography>
      </Grid>
      <Grid className={styles.itemBlock}>
        <Grid className={styles.infoItem}>
          <AttachMoney className={styles.detailsIcon} />
          <Typography>Price per Person</Typography>
        </Grid>
        <Typography>~ 10 000 AMD</Typography>
      </Grid>
      <Typography className={styles.roomTitle}>NOTES</Typography>
      <Typography>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
        officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
        nostrud amet.
      </Typography>
    </TabPanel>
  );
}
