import { Container } from "../../../components";

import { Typography } from "@mui/material";
import { managerSidebarConfig } from "../config";

export default function Todo() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Typography>TO DO</Typography>
    </Container>
  );
}
