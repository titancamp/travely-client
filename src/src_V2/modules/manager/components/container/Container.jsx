import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

import { CONTAINER_SIZES } from '../../../../utils';
import styles from './Container.module.css';

const Main = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  minWidth: 1200,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 33,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: CONTAINER_SIZES.DRAWER_EXPANDED_WIDTH,
  }),
}));

const boxStyles = {
  minWidth: 700,
  width: '100%',
};

/**
 * @description - Container component which includes the following components in it, Sidebar, Appbar and Main
                  component with some ui styles to support the Sidebars behavior(expand/collapse);
 * @param children - The children elements.
 * @param managerSidebarConfig - The configs for sidebar menu options.
 * @returns {JSX.Element}
 */
export default function Enhancer({ children, managerSidebarConfig }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Box>
      <Header />
      <Box style={boxStyles}>
        <Sidebar
          open={openSidebar}
          setOpen={setOpenSidebar}
          pageConfigs={managerSidebarConfig}
        />
        <div className={styles.hiddenOffset} />
        <Main open={openSidebar}>{children}</Main>
      </Box>
    </Box>
  );
}
