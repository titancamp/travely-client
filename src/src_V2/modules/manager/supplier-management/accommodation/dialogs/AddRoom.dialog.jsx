import {
  Grid,
  Button,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogActions,
  DialogContent,
} from '@mui/material';

export default function AddRoomDialog({ onClose }) {
  return (
    <>
      <DialogTitle id="alert-dialog-title">Add Room</DialogTitle>
      <DialogContent style={{ paddingTop: 10 }}>
        <Grid container spacing={2} rowSpacing={4}>
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[
                { label: 'The Shawshank Redemption', year: 1994 },
                { label: 'The Godfather', year: 1972 },
              ]}
              renderInput={(params) => <TextField {...params} label="Type*" />}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Quantity" placeholder="Quantity" />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Price" placeholder="Price" />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Number of Beds" placeholder="Number of Beds" />
          </Grid>
          <Grid item xs={4}>
            <TextField label="Additional Beds" placeholder="Additional Beds" />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              options={[
                { label: 'The Godfather', year: 1972 },
                { label: 'The Shawshank Redemption', year: 1994 },
              ]}
              renderInput={(params) => <TextField {...params} label="Room Services" />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ marginTop: 40 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>
          Add
        </Button>
      </DialogActions>
    </>
  );
}
