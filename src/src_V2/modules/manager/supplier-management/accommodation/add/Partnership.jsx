import {
  Box,
  Button,
  InputLabel,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import { CalendarToday, CloudUpload } from "@mui/icons-material";

export default function Contact() {
  return (
    <Box
      style={{
        maxWidth: 400,
        margin: "40px 0 0 130px",
      }}
    >
      <Box style={{ display: "flex" }}>
        <p>Details</p>
        <Box
          style={{
            display: "flex",
          }}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Sign Date
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <CalendarToday />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Expiry Date
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <CalendarToday />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Box>
      </Box>

      <Button
        sx={{
          width: 310,
          borderRadius: 0.5,
          boxSizing: "border-box",
          background: "rgba(33, 131, 209, 0.08)",
          border: "1px solid rgba(33, 131, 209, 0.5)",
        }}
      >
        ADD ATTACHMENTS
        <CloudUpload />
      </Button>

      <Box style={{ display: "flex" }}>
        <p>Margin</p>
        <Box
          style={{
            display: "flex",
          }}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Percentage
            </InputLabel>
            <OutlinedInput id="outlined-adornment-password" label="Password" />
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Fixed Price
            </InputLabel>
            <OutlinedInput id="outlined-adornment-password" label="Password" />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
