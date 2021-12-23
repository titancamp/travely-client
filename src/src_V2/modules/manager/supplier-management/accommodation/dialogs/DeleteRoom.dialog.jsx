import { Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';

export default function DeleteRoomDialog({ id, onClose, deleteRoom }) {
  function deleteRoomItem() {
    deleteRoom(id);
  }

  return (
    <>
      <DialogTitle id='alert-dialog-title'>Note</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the item? Note, it will be permanent
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant='contained' onClick={deleteRoomItem}>
          Delete
        </Button>
      </DialogActions>
    </>
  );
}
