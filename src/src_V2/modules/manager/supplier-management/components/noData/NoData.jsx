import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import { Container } from '../../../../../components';
import { ROUTES } from '../../accommodation';
import { managerSidebarConfig } from '../../../config';

import styles from './style.module.css';

export default function NoData({ pageName, helperText, image }) {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
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
            Add My First {pageName.toUpperCase()}
          </Button>
        </Box>
        <Box alt={pageName} component='img' className={styles.img} src={image} />
      </Box>
    </Container>
  );
}