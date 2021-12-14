import { useState } from "react";

import Header from "./Header";
import Rooms from "./Rooms";
import MainInfo from "./MainInfo";
import { Box } from "@mui/material";
import { Container } from "../../../../../components";

import { managerSidebarConfig } from "../../../config";

function AccommodationStep({ currentTab }) {
  switch (currentTab) {
    case 1:
      return <MainInfo />;
    case 2:
      return <Rooms />;
    case 3:
      return <>STEP 3</>;
    case 4:
      return <>STEP 4</>;
    default:
      return null;
  }
}

export default function AddAccommodation() {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Box style={{ marginLeft: 120, marginTop: 50}}>
        <AccommodationStep currentTab={currentTab} />
      </Box>
    </Container>
  );
}
