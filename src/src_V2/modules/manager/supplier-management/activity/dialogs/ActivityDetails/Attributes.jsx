import { Button, Typography } from '@mui/material';
import { TabPanel } from '@mui/lab';

import styles from '../style.module.css';
import { AttributesConstants } from '../../constants';

export default function Attributes() {
  return (
    <TabPanel className={styles.mainInfo} value='2'>
      <Typography className={styles.attributesTitle}>ATTRIBUTES</Typography>
      {AttributesConstants.map((attribute) => (
        <Button
          variant='contained'
          key={attribute}
          className={styles.detailsServiceBtns}
          component='span'
        >
          {attribute}
        </Button>
      ))}
    </TabPanel>
  );
}
