import { Button, Typography } from '@mui/material';
import { TabPanel } from '@mui/lab';

import styles from '../style.module.css';
import { Menus } from '../../constants';

export default function Menu() {
  return (
    <TabPanel className={styles.mainInfo} value='2'>
      <Typography className={styles.roomTitle}>MENU</Typography>
      {Menus.map((menu) => (
        <Button
          variant='contained'
          key={menu.id}
          className={styles.detailsServiceBtns}
          component='span'
        >
          {menu.label}
        </Button>
      ))}
      <Typography className={styles.roomTitle}>MENU / ATTACHMENTS</Typography>
      {['Special Menu 2021.pdf', 'Drinks.pdf'].map((attachment) => (
        <Button
          variant='contained'
          key={attachment}
          className={styles.detailsServiceBtns}
          component='span'
        >
          {attachment}
        </Button>
      ))}
    </TabPanel>
  );
}
