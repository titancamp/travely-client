import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { Container } from '../../../../../components';
import accommodationImage from '../../../../../assets/images/accommodation.png';

import { ROUTES } from '../routes';
import { managerSidebarConfig } from '../../../config';

import styles from './style.module.css';

export default function AccommodationNoData() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Box className={styles.landing}>
        <Box className={styles.info}>
          <Typography variant={'h4'}>Accommodation</Typography>
          <p className={styles.infoContent}>
            Here will be helper text, for case when there is not data yet
          </p>
          <Button
            size="large"
            to={ROUTES.ADD}
            component={Link}
            variant="contained"
            className={styles.addBtn}
          >
            Add My First ACCOMMODATION
          </Button>
        </Box>
        <Box component="img" alt="Accommodation" className={styles.img} src={accommodationImage} />
      </Box>
    </Container>
  );
}
