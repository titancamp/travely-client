import { Dialog } from '@mui/material';
import ViewRoomDialog from './ViewRoom.dialog';
import AllFiltersDialog from './AllFilters.dialog';
import AddEditRoomDialog from './AddEditRoom.dialog';
import Map from '../../components/dialogs/Map.dialog';
import DeleteDialog from '../../components/dialogs/Delete.dialog';
import AccommodationDetailsDialog from './AccommodationDetails.dialog';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'map':
      return <Map onClose={onClose} />;
    case 'add':
      return <AddEditRoomDialog onClose={onClose} onSuccess={data.actions} />;
    case 'edit':
      return (
        <AddEditRoomDialog
          editMode
          room={data.state}
          onClose={onClose}
          onSuccess={data.actions}
        />
      );
    case 'view':
      return <ViewRoomDialog data={data} />;
    case 'accommodationFilters':
      return <AllFiltersDialog data={data} onClose={onClose} />;
    case 'accommodationDetails':
      return <AccommodationDetailsDialog data={data} onClose={onClose} />;
    case 'delete':
      return (
        <DeleteDialog onClose={onClose} id={data.state.id} deleteAction={data.actions} />
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
