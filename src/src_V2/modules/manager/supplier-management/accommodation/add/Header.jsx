import { COLORS } from "../../../../../utils/constants";
import { Box, Tab, Tabs, Button, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

export default function Header({ currentTab, setCurrentTab }) {
  return (
    <>
      <HeaderComponent />
      <TabsComponent currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </>
  );
}

function TabsComponent({ currentTab, setCurrentTab }) {
  function handleChange(event, newValue) {
    setCurrentTab(newValue);
  }

  return (
    <Box
      style={{
        height: 56,
        paddingLeft: 80,
        backgroundColor: grey[50],
      }}
    >
      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab value={1} label="MAIN INFO" />
        <Tab value={2} label="ROOMS" />
        <Tab value={3} label="CONTACT" />
        <Tab value={4} label="PARTNERSHIP" />
      </Tabs>
    </Box>
  );
}

/**
 * COMPONENTS
 */

function HeaderComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "15px 72px",
        justifyContent: "space-between",
        backgroundColor: "primary.main",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: grey[50],
          marginLeft: 1.5,
        }}
      >
        <ArrowBack fontSize={"medium"} />
        <Typography
          variant={"h5"}
          style={{ alignItems: "center", marginLeft: "20px" }}
        >
          Add Accommodation
        </Typography>
      </Box>
      <Box>
        <Button
          style={{ boxShadow: "none", marginRight: "18px" }}
          size={"large"}
          variant={"contained"}
        >
          CANCEL
        </Button>
        <Button
          variant={"contained"}
          size={"large"}
          sx={{
            color: "primary.main",
            backgroundColor: "#ffffff",
            "&.Mui-disabled": {
              backgroundColor: grey[300],
              color: "rgba(0,0,0,0.26)",
            },
          }}
        >
          ADD
        </Button>
      </Box>
    </Box>
  );
}
