import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import { ROUTES } from '../../accommodation';

import styles from './style.module.css';

export default function NoData({ pageName, helperText, image, buttonContent }) {
  return (
    <Box className={styles.landing}>
      <Box className={styles.info}>
        <Typography variant={'h4'}>{pageName}</Typography>
        <p className={styles.infoContent}>{helperText}</p>
        <Button
          size='large'
          to={ROUTES.ADD}
          component={Link}
          variant='contained'
          className={styles.addBtn}
        >
          {buttonContent || `Add My First ${pageName.toUpperCase()}`}
        </Button>
      </Box>
      <Box alt={pageName} component='img' className={styles.img} src={image} />
    </Box>
  );
}
