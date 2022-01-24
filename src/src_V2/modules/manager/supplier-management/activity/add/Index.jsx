import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MainInfo from './MainInfo';
import { Banner, Partnership } from '../../components';

import styles from './style.module.css';

function ActivitySteps({ currentTab: { step, isValidate }, activity }) {
  switch (step) {
    case 1:
      return <MainInfo isValidate={isValidate} parentRef={activity} />;
    case 2:
      return <Partnership parentRef={activity} />;
    default:
      return null;
  }
}

export default function AddActivity() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState({ step: 1 });
  const { current: activity } = useRef({
    mainInfo: {},
    partnership: { isValid: true },
  });

  function onSubmit() {
    if (!activity.mainInfo.isValid) {
      return setCurrentTab({ step: 1, isValidate: true });
    } else if (!activity.partnership.isValid) {
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
        pageName='Activity'
        setCurrentTab={setCurrentTab}
        subMenus={['MAIN INFO', 'PARTNERSHIP']}
      />
      <Box className={styles.container}>
        <ActivitySteps currentTab={currentTab} activity={activity} />
      </Box>
    </>
  );
}
