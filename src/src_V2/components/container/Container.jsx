import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

import Layout from '../layout/Layout';

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

const boxStyles = {
  position: 'relative',
  display: 'flex',
  minHeight: '91.4vh',
  marginTop: '2px',
};

/**
 * @description - Container component which includes the following components in it, Sidebar, Appbar and Main component
 *                with some ui styles to support the Sidebars behavior(expand/collapse);
 * @param children - The children elements.
 * @param managerSidebarConfig - The configs for sidebar menu options.
 * @param showLayout - Whether to show the Layout component
 * @param title - The Title of Layout if there is one
 * @returns {JSX.Element}
 */
export default function Enhancer({ children, managerSidebarConfig, showLayout, title }) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <Box>
      <Header />
      <Box sx={boxStyles}>
        <Sidebar pageConfigs={managerSidebarConfig} open={openSidebar} setOpen={setOpenSidebar} />
        <Main open={openSidebar}>
          {showLayout ? <Layout title={title}>{children}</Layout> : children}
        </Main>
      </Box>
    </Box>
  );
}
