import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import Sidebar from "./Sidebar";

import { CONTAINER_SIZES } from "../../utils/constants";

const {
    DRAWER_EXPANDED_WIDTH,
    DRAWER_COLLAPSED_WIDTH,
    CONTENT_LEFT_MARGIN,
} = CONTAINER_SIZES;

const Main = styled("main")(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: DRAWER_COLLAPSED_WIDTH + CONTENT_LEFT_MARGIN,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_EXPANDED_WIDTH + CONTENT_LEFT_MARGIN,
  }),
}));

const boxStyles = {
  display: "inline-block",
  position: "relative",
};

/**
 * @description - Container component which includes the following components in it, Sidebar, Appbar and Main component
 *                with some ui styles to support the Sidebars behavior(expand/collapse);
 * @param children - The children elements.
 * @param managerSidebarConfig - The configs for sidebar menu options.
 * @returns {JSX.Element}
 */
export default function Enhancer({ children, managerSidebarConfig }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Box style={boxStyles}>
      <Sidebar
        pageConfigs={managerSidebarConfig}
        open={openSidebar}
        setOpen={setOpenSidebar}
      />
      <Main open={openSidebar}>{children}</Main>
    </Box>
  );
}
