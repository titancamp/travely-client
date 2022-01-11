import { Box } from '@mui/material';
import { useRef, useState } from 'react';

import { Container } from '../../../../../components';
import { Banner, Contact, Partnership } from '../../components';

import styles from './style.module.css';
import { managerSidebarConfig } from '../../../config';
import MainInfo from './MainInfo';

function TransportationSteps({ currentTab: { step, isValidate }, food }) {
  switch (step) {
    case 1:
      return <MainInfo isValidate={isValidate} parentRef={food} />;
    case 2:
      return <Contact parentRef={food} />;
    case 3:
      return <>Menu</>;
    case 4:
      return <Partnership parentRef={food} />;
    default:
      return null;
  }
}

export default function AddFood() {
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
      console.log(food);
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
