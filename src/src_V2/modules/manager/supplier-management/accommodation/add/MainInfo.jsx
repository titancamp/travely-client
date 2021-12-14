import { Box, TextField, Autocomplete } from "@mui/material";

export default function MainInfo() {
  return (
    <Box
      style={{
        width: "832px",
        margin: "40px 0 0 130px",
      }}
    >
      <p>Details</p>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[
            { label: "The Shawshank Redemption", year: 1994 },
            { label: "The Godfather", year: 1972 },
          ]}
          sx={{ width: "48%" }}
          renderInput={(params) => <TextField {...params} label="Type*" />}
        />
        <TextField
          style={{ width: "48%" }}
          multiline
          label="Name*"
          id="outlined-textarea"
          placeholder="Placeholder"
        />
      </Box>
      <Box
        style={{
          width: "48%",
          marginTop: 32,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          multiline
          label="Region"
          id="outlined-textarea"
          placeholder="Placeholder"
        />
        <TextField
          multiline
          label="City"
          id="outlined-textarea"
          placeholder="Placeholder"
        />
      </Box>
      <p>Adress</p>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          style={{ width: "48%" }}
          multiline
          label="Name*"
          id="outlined-textarea"
          placeholder="Placeholder"
        />
        <TextField
          style={{ width: "48%" }}
          multiline
          label="Name*"
          id="outlined-textarea"
          placeholder="Placeholder"
        />
      </Box>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[
          { label: "The Shawshank Redemption", year: 1994 },
          { label: "The Godfather", year: 1972 },
        ]}
        sx={{ marginTop: 4 }}
        renderInput={(params) => <TextField {...params} label="Type*" />}
      />
      <TextField
        rows={4}
        fullWidth
        multiline
        label="Multiline"
        style={{ marginTop: 32 }}
        id="outlined-multiline-static"
        defaultValue="Notes"
      />
    </Box>
  );
}
