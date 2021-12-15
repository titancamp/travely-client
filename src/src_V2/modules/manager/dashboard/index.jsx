import { Container } from "../../../components";

import { managerSidebarConfig } from "../config";

export default function Dashboard() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <h1>Dashboard</h1>
    </Container>
  );
}
