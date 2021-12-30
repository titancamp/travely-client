import { Box } from '@mui/material';
import { useRef, useState } from 'react';

import Drivers from './Drivers';
import { Container } from '../../../../../components';
import { Banner, Partnership } from '../../components';

import styles from './style.module.css';
import { managerSidebarConfig } from '../../../config';
import Cars from './Cars';
import MainInfo from './MainInfo';

function TransportationSteps({ currentTab, transportation }) {
  switch (currentTab) {
    case 1:
      return <MainInfo parentRef={transportation} />;
    case 2:
      return <Drivers parentRef={transportation} />;
    case 3:
      return <Cars parentRef={transportation} />;
    case 4:
      return <Partnership parentRef={transportation} />;
    default:
      return null;
  }
}

export default function AddTransportation() {
  const [currentTab, setCurrentTab] = useState(1);
  const { current: transportation } = useRef({
    cars: [],
    drivers: [],
    mainInfo: {},
    partnership: {},
  });

  function onSubmit() {
    if (!transportation.mainInfo.isValid) {
      return setCurrentTab(1);
    } else if (!transportation.partnership.isValid) {
      return setCurrentTab(4);
    } else {
      console.log(transportation);
    }
  }

  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Banner
        onSubmit={onSubmit}
        currentTab={currentTab}
        pageName='Transportation'
        setCurrentTab={setCurrentTab}
        subMenus={['MAIN INFO', 'DRIVERS', 'CARS', 'PARTNERSHIP']}
      />
      <Box className={styles.container}>
        <TransportationSteps currentTab={currentTab} transportation={transportation} />
      </Box>
    </Container>
  );
}
