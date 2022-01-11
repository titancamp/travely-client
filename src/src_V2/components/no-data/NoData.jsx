import { Box } from '@mui/material';

import noDataImage from '../../assets/images/no-data.png';
import styles from './NoData.module.css';

export default function NoData({ message }) {
  return (
    <div className={styles.mainDiv}>
      <Box component="img" alt="No Data" src={noDataImage} className={styles.imgIcon} />
      <p className={styles.textContent}>{message || 'There is no data to display'}</p>
    </div>
  );
}
