import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Banner } from '../../../supplier-management/components';
import Finance from './Finance/Finance';
import TourInfo from './TourInfo';
import Calendar from './calendar/Calendar';
import styles from './style.module.css';

function TourPackageSteps({ currentTab: { step, isValidate }, tourPackage }) {
  switch (step) {
    case 1:
      return (
        <Box className={styles.container}>
          <TourInfo isValidate={isValidate} parentRef={tourPackage} />
        </Box>
      );
    case 2:
      return <Box className={styles.container}>PARTICIPANTS</Box>;
    case 3:
      return (
        <Box className={styles.calendarContainer}>
          <Calendar />
        </Box>
      );
    case 4:
      return (
        <Box className={styles.container}>
          <Finance parentRef={tourPackage} />
        </Box>
      );
    default:
      return null;
  }
}

export default function AddTourPackage() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState({ step: 1 });
  const { current: tourPackage } = useRef({
    finance: {},
    mainInfo: {},
  });

  function onSubmit() {
    navigate('../list');
  }

  return (
    <>
      <Banner
        onSubmit={onSubmit}
        pageName='Tour Package'
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        subMenus={['TOUR INFO', 'PARTICIPANTS', 'CALENDAR', 'PRICE SUMMARY']}
      />
      <TourPackageSteps currentTab={currentTab} tourPackage={tourPackage} />
    </>
  );
}
