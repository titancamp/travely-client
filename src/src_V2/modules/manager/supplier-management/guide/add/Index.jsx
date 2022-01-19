import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Guide from './Guide';
import MainInfo from './MainInfo';
import { Banner, Partnership } from '../../components';

import styles from './style.module.css';

function GuideSteps({ currentTab: { step }, guide }) {
  switch (step) {
    case 1:
      return <MainInfo parentRef={guide} />;
    case 2:
      return <Guide parentRef={guide} />;
    case 3:
      return <Partnership parentRef={guide} />;
    default:
      return null;
  }
}

export default function AddGuide() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState({ step: 1 });
  const { current: guide } = useRef({
    guides: [],
    mainInfo: {},
    partnership: { isValid: true },
  });

  function onSubmit() {
    if (!guide.mainInfo.isValid) {
      return setCurrentTab({ step: 1, isValidate: true });
    } else if (!guide.contact.isValid) {
      return setCurrentTab({ step: 2 });
    } else {
      navigate('../list');
    }
  }

  return (
    <>
      <Banner
        onSubmit={onSubmit}
        currentTab={currentTab}
        pageName='Guide'
        setCurrentTab={setCurrentTab}
        subMenus={['MAIN INFO', 'GUIDES', 'PARTNERSHIP']}
      />
      <Box className={styles.container}>
        <GuideSteps currentTab={currentTab} guide={guide} />
      </Box>
    </>
  );
}
