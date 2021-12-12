import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import { Container } from "../../../../components";
import accommodationImage from "../../../../assets/accommodation.png";
import { managerSidebarConfig } from "../../config";
import { COLORS } from "../../../../utils/constants";

export default function Accommodation() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig}>
      <HeaderComponent />
      <Box style={{
          height: 56,
          // opacity: 0.9,
          // backgroundColor: COLORS.grey,
          backgroundColor: COLORS.lightGrayColor,
      }}>
      </Box>
    </Container>
  );
}

/**
 * COMPONENTS
 */

function HeaderComponent() {
  return (
    <Box
      sx={{
        height: 72,
        paddingLeft: 10,
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "primary.main",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ArrowBack sx={{ margin: 2.5, color: "white" }} fontSize={"medium"} />
        <Typography
          variant={"h4"}
          style={{ alignItems: "center" }}
          color={"white"}
        >
          Add Accommodation
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginRight: 7 }}>
        {/*<Button variant={"contained"} size={"large"} color={"primary"}>*/}
        {/*  Cancel*/}
        {/*</Button>*/}
        <Button>
          <Typography
            size={"large"}
            variant={"contained"}
            style={{ color: COLORS.whiteColor, marginRight: 30 }}
          >
            CANCEL
          </Typography>
        </Button>
        <Button
          variant={"contained"}
          size={"large"}
          style={{
            color: COLORS.darkColor,
            backgroundColor: COLORS.lightGrayColor,
          }}
        >
          <Typography
            style={{
              opacity: 0.25,
              color: COLORS.darkColor,
            }}
          >
            ADD
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

function EmptyResult() {
  return (
    <Box style={{ display: "flex", paddingTop: "65px" }}>
      <Box
        style={{
          height: 380,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            width: 500,
            height: 152,
          }}
        >
          <Typography variant={"h4"}>Accommodation</Typography>
          <p style={{ opacity: 0.6, marginTop: 8 }}>
            Here will be helper text, for case when there is not data yet
          </p>
          <Button
            variant={"contained"}
            size={"large"}
            style={{ marginTop: 32 }}
          >
            Add My First ACCOMMODATION
          </Button>
        </Box>
      </Box>
      <Box
        component="img"
        sx={{
          height: 381,
          width: 665,
        }}
        alt="Accommodation"
        src={accommodationImage}
      />
    </Box>
  );
}
