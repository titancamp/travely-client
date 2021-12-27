import { Box } from '@mui/material';

import noDataImage from '../../assets/no-data.png';
import { COLORS } from '../../utils';
import styles from './NoData.module.css';

const textStyles = {
  color: COLORS.darkGray,
};

export default function NoData({ message }) {
  return (
    <div className={styles.mainDiv}>
      <Box component="img" alt="No Data" src={noDataImage} className={styles.imgIcon} />
      <p style={textStyles} className={styles.textContent}>
        {message || 'There is no data to display'}
      </p>
    </div>
  );
}
