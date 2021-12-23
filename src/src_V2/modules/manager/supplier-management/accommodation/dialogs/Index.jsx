import { Dialog } from '@mui/material';
import AddRoomDialog from './AddRoom.dialog';
import ViewRoomDialog from './ViewRoom.dialog';
import DeleteRoomDialog from './DeleteRoom.dialog';

function CurrentDialog({ data, onClose, onShowHideDialog }) {
  switch (data.mode) {
    case 'add':
      return <AddRoomDialog onClose={onClose} />;
    case 'edit':
      return <AddRoomDialog onClose={onClose} onShowHideDialog={onShowHideDialog} />;
    case 'view':
      return <ViewRoomDialog id={data.id} onShowHideDialog={onShowHideDialog} />;
    case 'delete':
      return <DeleteRoomDialog onClose={onClose} />;
    default:
      return null;
  }
}

export default function DialogManager({ data, onShowHideDialog }) {
  function onClose() {
    onShowHideDialog({
      mode: '',
      open: false,
    });
  }

  return (
    <Dialog open={data.open} onClose={onClose}>
      <CurrentDialog data={data} onClose={onClose} onShowHideDialog={onShowHideDialog} />
    </Dialog>
  );
}
