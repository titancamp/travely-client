import { Box } from '@mui/material';
import { useRef, useState } from 'react';

import Rooms from './Rooms';
import MainInfo from './MainInfo';
import { Container } from '../../../../../components';
import { Banner, Partnership, Contact } from '../../components';

import styles from './style.module.css';
import { managerSidebarConfig } from '../../../config';

function AccommodationStep({ currentTab, accommodation }) {
  switch (currentTab) {
    case 1:
      return <MainInfo parentRef={accommodation} />;
    case 2:
      return <Rooms parentRef={accommodation} />;
    case 3:
      return <Contact parentRef={accommodation} />;
    case 4:
      return <Partnership parentRef={accommodation} />;
    default:
      return null;
  }
}

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
      console.log(accommodation);
    }
  }

  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Banner
        onSubmit={onSubmit}
        currentTab={currentTab}
        pageName='Accommodation'
        setCurrentTab={setCurrentTab}
        subMenus={['MAIN INFO', 'ROOMS', 'CONTACT', 'PARTNERSHIP']}
      />
      <Box className={styles.container}>
        <AccommodationStep currentTab={currentTab} accommodation={accommodation} />
      </Box>
    </Container>
  );
}

//TODO prettify onSubmit function
//TODO Add button disable enable
//TODO Sidebar height need to be full

/**
 * TODO on Main info
 * 1. Pin on Map
 * 3. Static data get from backend
 */

/**
 * TODO on Contact
 * grid implementation for small screens
 */

/**
 * TODO on Room
 * Handle disable state, tooltip text and styles on add room card
 */

/**
 * TODO on Partnership
 * handle the attachments functionality
 * read and implement FRD requirements
 * partnership inputs length styles
 */
