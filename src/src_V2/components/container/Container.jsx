import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from './header/Header';
import Sidebar from './Sidebar';

//TODO removable
// import { CONTAINER_SIZES } from '../../utils';
// const { DRAWER_EXPANDED_WIDTH, DRAWER_COLLAPSED_WIDTH } = CONTAINER_SIZES;

const Main = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  minWidth: 1200,
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

//TODO move styles to css module.
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
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <Box>
      <Header />
      <Box style={boxStyles}>
        <Sidebar
          open={openSidebar}
          setOpen={setOpenSidebar}
          pageConfigs={managerSidebarConfig}
        />
        <Main open={openSidebar}>{children}</Main>
      </Box>
    </Box>
  );
}
