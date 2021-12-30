import { Dialog } from '@mui/material';

import Map from '../../components/dialogs/Map.dialog';
import AddEditDriverDialog from './AddEditDriver.dialog';
import DeleteDialog from '../../components/dialogs/Delete.dialog';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'map':
      return <Map onClose={onClose} />;
    case 'add':
      return <AddEditDriverDialog onClose={onClose} onSuccess={data.actions} />;
    case 'edit':
      return <></>;
    case 'view':
      return <></>;
    case 'delete':
      return (
        <DeleteDialog onClose={onClose} id={data.state.id} deleteRoom={data.actions} />
      );
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
      <CurrentDialog data={data} onClose={onClose} />
    </Dialog>
  );
}
