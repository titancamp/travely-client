import { Box } from '@mui/material';
import { useRef, useState } from 'react';

import Rooms from './Rooms';
import Contact from './Contact';
import MainInfo from './MainInfo';
import Banner from '../banner/Banner';
import Partnership from './Partnership';
import { Container } from '../../../../../components';

import styles from './style.module.css';
import { managerSidebarConfig } from '../../../config';

function AccommodationStep({ currentTab, accommodation }) {
  switch (currentTab) {
    case 1:
      return <MainInfo accommodation={accommodation} />;
    case 2:
      return <Rooms accommodation={accommodation} />;
    case 3:
      return <Contact accommodation={accommodation} />;
    case 4:
      return <Partnership accommodation={accommodation} />;
    default:
      return null;
  }
}

//TODO prettify onSubmit function
export default function AddAccommodation() {
  const [currentTab, setCurrentTab] = useState(1);
  const { current: accommodation } = useRef({
    rooms: [],
    contact: {},
    mainInfo: {},
    partnership: {},
  });

  function onSubmit() {
    if (!accommodation.mainInfo.isValid) {
      return setCurrentTab(1);
    } else if (!accommodation.contact.isValid) {
      return setCurrentTab(3);
    } else if (!accommodation.partnership.isValid) {
      return setCurrentTab(4);
    } else {
      alert(JSON.stringify(accommodation, null, 2));
    }
  }

  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Banner onSubmit={onSubmit} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Box className={styles.container}>
        <AccommodationStep currentTab={currentTab} accommodation={accommodation} />
      </Box>
    </Container>
  );
}
