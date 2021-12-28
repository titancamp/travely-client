import { Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';

export default function DeleteRoomDialog() {
  return (
    <>
      <DialogTitle id="alert-dialog-title">Note</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the item? Note, it will be permanent
      </DialogContent>
      <DialogActions>
        <Button onClick={() => ''}>Cancel</Button>
        <Button variant="contained">Delete</Button>
      </DialogActions>
    </>
  );
}
