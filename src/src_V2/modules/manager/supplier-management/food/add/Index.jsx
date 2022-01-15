import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '../../../../../components';
import { Banner, Contact, Partnership } from '../../components';

import styles from './style.module.css';
import { managerSidebarConfig } from '../../../config';
import MainInfo from './MainInfo';
import Menu from './Menu';

function TransportationSteps({ currentTab: { step, isValidate }, food }) {
  switch (step) {
    case 1:
      return <MainInfo isValidate={isValidate} parentRef={food} />;
    case 2:
      return <Contact parentRef={food} />;
    case 3:
      return <Menu parentRef={food} />;
    case 4:
      return <Partnership parentRef={food} />;
    default:
      return null;
  }
}

export default function AddFood() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState({ step: 1 });
  const { current: food } = useRef({
    menu: {},
    contact: {},
    mainInfo: {},
    partnership: { isValid: true },
  });

  function onSubmit() {
    if (!food.mainInfo.isValid) {
      return setCurrentTab({ step: 1, isValidate: true });
    } else if (!food.contact.isValid) {
      return setCurrentTab({ step: 2 });
    } else if (!food.partnership.isValid) {
      return setCurrentTab({ step: 4 });
    } else {
      navigate('../list');
    }
  }

  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Banner
        onSubmit={onSubmit}
        currentTab={currentTab}
        pageName='Food Supplier'
        setCurrentTab={setCurrentTab}
        subMenus={['MAIN INFO', 'CONTACT', 'MENU', 'PARTNERSHIP']}
      />
      <Box className={styles.container}>
        <TransportationSteps currentTab={currentTab} food={food} />
      </Box>
    </Container>
  );
}
