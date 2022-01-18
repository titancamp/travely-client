import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Rooms from './Rooms';
import MainInfo from './MainInfo';
import { Container } from '../../../../../components';
import { Banner, Partnership, Contact } from '../../components';

import styles from './style.module.css';
import { managerSidebarConfig } from '../../../config';

function AccommodationStep({ accommodation, currentTab: { step, isValidate } }) {
  switch (step) {
    case 1:
      return <MainInfo isValidate={isValidate} parentRef={accommodation} />;
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
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState({ step: 1 });
  const { current: accommodation } = useRef({
    rooms: [],
    mainInfo: {},
    contact: { isValid: true },
    partnership: { isValid: true },
  });

  function onSubmit() {
    if (!accommodation.mainInfo.isValid) {
      setCurrentTab({ step: 1, isValidate: true });
    } else if (!accommodation.contact.isValid) {
      setCurrentTab({ step: 3 });
    } else if (!accommodation.partnership.isValid) {
      setCurrentTab({ step: 4 });
    } else {
      navigate('../list');
    }
  }

  return (
    <>
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
    </>
  );
}
