import React from "react";
import {Container} from "../../../components";

import { Typography } from "@mui/material";
import {managerSidebarConfig} from "../config";

export default function Reporting() {
  return (
      <Container managerSidebarConfig={managerSidebarConfig}>
          <Typography>Reporting</Typography>
      </Container>
      );
}
