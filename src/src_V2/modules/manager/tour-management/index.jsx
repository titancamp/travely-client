import React from "react";
import {Container} from "../../../components";

import { Typography } from "@mui/material";
import {managerSidebarConfig} from "../config";

export default function TourManagement() {
  return (
      <Container managerSidebarConfig={managerSidebarConfig}>
          <Typography>TourManagement</Typography>
      </Container>
      );
}
