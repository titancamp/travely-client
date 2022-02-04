import { Dialog, Tab } from '@mui/material';

import DeleteDialog from '../../components/dialogs/Delete.dialog';
import DetailsDialog from '../../components/dialogs/Details.dialog';
import MainInfo from '../../components/dialogs/MainInfo';
import Map from '../../components/dialogs/Map.dialog';
import Partnership from '../../components/dialogs/Partnership';
import Rooms from './AccommodationDetails/Rooms';
import AddEditRoomDialog from './AddEditRoom.dialog';
import AllFiltersDialog from './AllFilters.dialog';
import ViewRoomDialog from './ViewRoom.dialog';

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
      return (
        <DetailsDialog
          data={data}
          onClose={onClose}
          tabs={{
            mainInfo: <MainInfo />,
            rooms: <Rooms />,
            partnership: <Partnership tabNumber='3' />,
          }}
          tabList={{
            mainInfo: <Tab label='MAIN INFO' value='1' />,
            rooms: <Tab label='ROOMS' value='2' />,
            partnership: <Tab label='PARTNERSHIP' value='3' />,
          }}
        />
      );
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
