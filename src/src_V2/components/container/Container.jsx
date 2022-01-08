import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Header, Sidebar } from '../';
import styles from './Container.module.css';

const Main = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/**
 * @description - Container component which includes the following components in it, Sidebar, Appbar and Main component
 *                with some ui styles to support the Sidebars behavior(expand/collapse);
 * @param children - The children elements.
 * @param managerSidebarConfig - The configs for sidebar menu options.
 * @returns {JSX.Element}
 */
export default function Enhancer({ children, managerSidebarConfig }) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <Box>
      <Header />
      <Box className={styles.subBox}>
        <Sidebar pageConfigs={managerSidebarConfig} open={openSidebar} setOpen={setOpenSidebar} />
        <Main open={openSidebar} className={styles.main}>
          {children}
        </Main>
      </Box>
    </Box>
  );
}
