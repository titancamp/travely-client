import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '../../../../../components';
import { Banner } from '../../../supplier-management/components';
import Finance from './Finance';
import TourInfo from './TourInfo';

import { managerSidebarConfig } from '../../../config';
import styles from './style.module.css';

function TourPackageSteps({ currentTab: { step, isValidate }, tourPackage }) {
  switch (step) {
    case 1:
      return <TourInfo isValidate={isValidate} parentRef={tourPackage} />;
    case 2:
      return <>PARTICIPANTS</>;
    case 3:
      return <>CALENDAR :(</>;
    case 4:
      return <Finance parentRef={tourPackage} />;
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
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Banner
        pageName='Tour Package'
        onSubmit={onSubmit}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        subMenus={['TOUR INFO', 'PARTICIPANTS', 'CALENDAR', 'FINANCE']}
      />
      <Box className={styles.container}>
        <TourPackageSteps currentTab={currentTab} tourPackage={tourPackage} />
      </Box>
    </Container>
  );
}
