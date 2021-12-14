import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";

import { Container } from "../../../../components";
import accommodationImage from "../../../../assets/accommodation.png";

import { ROUTES } from "./routes";
import { managerSidebarConfig } from "../../config";

export default function EmptyResult() {
  return (
    <Container managerSidebarConfig={managerSidebarConfig} >
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: "78px", marginTop: "64px", paddingRight: "78px" }}>
          <Box
            style={{
              maxWidth: 500,
              width: "100%"
            }}
          >
            <Typography variant={"h4"}>Accommodation</Typography>
            <p style={{ opacity: 0.6, marginTop: 8 }}>
              Here will be helper text, for case when there is not data yet
            </p>
            <Button
              component={Link}
              variant={"contained"}
              size={"large"}
              style={{ marginTop: 16 }}
              to={ROUTES.ADD}
            >
              Add My First ACCOMMODATION
            </Button>
          </Box>
        <Box
          component="img"
          sx={{
            height: 381,
            width: 665,
            marginRight: 24
          }}
          alt="Accommodation"
          src={accommodationImage}
        />
      </Box>
    </Container>
  );
}
