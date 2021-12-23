import { useRef, useState } from 'react';
import { Box } from '@mui/material';

import Rooms from './Rooms';
import Banner from '../banner/Banner';
import Contact from './Contact';
import MainInfo from './MainInfo';
import Partnership from './Partnership';
import { Container } from '../../../../../components';

import styles from './style.module.css';
import { managerSidebarConfig } from '../../../config';

function AccommodationStep({ currentTab, accommodation }) {
  switch (currentTab) {
    case 1:
      return <MainInfo accommodation={accommodation} />;
    case 2:
      return <Rooms />;
    case 3:
      return <Contact />;
    case 4:
      return <Partnership />;
    default:
      return null;
  }
}

export default function AddAccommodation() {
  const [currentTab, setCurrentTab] = useState(1);
  const { current: accommodation } = useRef({});

  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Banner currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Box className={styles.container}>
        <AccommodationStep currentTab={currentTab} accommodation={accommodation} />
      </Box>
    </Container>
  );
}
