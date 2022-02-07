import { Dialog, Tab } from '@mui/material';

import DeleteDialog from '../../components/dialogs/Delete.dialog';
<<<<<<< HEAD
import DetailsDialog from '../../components/dialogs/Details.dialog';
import MainInfo from '../../components/dialogs/MainInfo';
import Map from '../../components/dialogs/Map.dialog';
import Partnership from '../../components/dialogs/Partnership';
import AddEditCarDialog from './AddEditCar.dialog';
import AddEditDriverDialog from './AddEditDriver.dialog';
import AllFiltersDialog from './AllFilters.dialog';
import Cars from './TransportationDetails/Cars';
import Drivers from './TransportationDetails/Drivers';
=======
import Map from '../../components/dialogs/Map.dialog';
import AddEditCarDialog from './AddEditCar.dialog';
import AddEditDriverDialog from './AddEditDriver.dialog';
>>>>>>> dev
import ViewCarDialog from './ViewCar.dialog';
import ViewDriverDialog from './ViewDriver.dialog';

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
      return (
        <DetailsDialog
          data={data}
          onClose={onClose}
          tabs={{
            mainInfo: <MainInfo />,
            drivers: <Drivers />,
            cars: <Cars />,
            partnership: <Partnership tabNumber='4' />,
          }}
          tabList={{
            mainInfo: <Tab label='MAIN INFO' value='1' />,
            drivers: <Tab label='DRIVERS' value='2' />,
            cars: <Tab label='CARS' value='3' />,
            partnership: <Tab label='PARTNERSHIP' value='4' />,
          }}
        />
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
