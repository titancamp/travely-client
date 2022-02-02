import { Box } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';

import styles from './styles.module.css';

export default function ImgPlaceholder({ width, height, img }) {
  return (
    <Box className={styles['img-wrapper']} width={width} height={height}>
      {img ? (
        <img src={img} className={styles.img} alt='' />
      ) : (
        <div className={styles.placeholder}>
          <PanoramaIcon />
        </div>
      )}
    </Box>
  );
}
