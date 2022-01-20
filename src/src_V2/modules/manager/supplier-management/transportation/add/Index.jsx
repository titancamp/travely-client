import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cars from './Cars';
import MainInfo from './MainInfo';
import Drivers from './Drivers';
import { Banner, Partnership } from '../../components';

import styles from './style.module.css';

function TransportationSteps({ currentTab: { step, isValidate }, transportation }) {
  switch (step) {
    case 1:
      return <MainInfo isValidate={isValidate} parentRef={transportation} />;
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
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState({ step: 1 });
  const { current: transportation } = useRef({
    cars: [],
    drivers: [],
    mainInfo: {},
    partnership: { isValid: true },
  });

  function onSubmit() {
    if (!transportation.mainInfo.isValid) {
      return setCurrentTab({ step: 1, isValidate: true });
    } else if (!transportation.partnership.isValid) {
      return setCurrentTab({ step: 4 });
    } else {
      navigate('../list');
    }
  }

  return (
    <>
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
    </>
  );
}
