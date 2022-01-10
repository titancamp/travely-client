import { Dialog } from '@mui/material';

import ViewCarDialog from './ViewCar.dialog';
import ViewDriverDialog from './ViewDriver.dialog';
import AddEditCarDialog from './AddEditCar.dialog';
import AddEditDriverDialog from './AddEditDriver.dialog';
import Map from '../../components/dialogs/Map.dialog';
import DeleteDialog from '../../components/dialogs/Delete.dialog';
import AllFiltersDialog from './AllFilters.dialog';
import TransportationDetailsDialog from './TransportationDetails.dialog';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'map':
      return <Map onClose={onClose} />;
    case 'add-driver':
      return <AddEditDriverDialog onClose={onClose} onSuccess={data.actions} />;
    case 'edit-driver':
      return (
        <AddEditDriverDialog
          editMode
          onClose={onClose}
          driver={data.state}
          onSuccess={data.actions}
        />
      );
    case 'view-driver':
      return <ViewDriverDialog data={data} />;
    case 'add-car':
      return <AddEditCarDialog onClose={onClose} onSuccess={data.actions} />;
    case 'edit-car':
      return (
        <AddEditCarDialog
          editMode
          onClose={onClose}
          car={data.state}
          onSuccess={data.actions}
        />
      );
    case 'view-car':
      return <ViewCarDialog data={data} />;
    case 'delete':
      return (
        <DeleteDialog onClose={onClose} id={data.state.id} deleteAction={data.actions} />
      );
    case 'accommodationFilters':
      return <AllFiltersDialog data={data} onClose={onClose} />;
    case 'transportationDetails':
      return <TransportationDetailsDialog data={data} onClose={onClose} />;
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
