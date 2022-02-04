import { Dialog, Tab } from '@mui/material';

import DeleteDialog from '../../components/dialogs/Delete.dialog';
import DetailsDialog from '../../components/dialogs/Details.dialog';
import MainInfo from '../../components/dialogs/MainInfo';
import Partnership from '../../components/dialogs/Partnership';
import AllFiltersDialog from './AllFilters.dialog';
import Menu from './FoodDetails/Menu';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'delete':
      return (
        <DeleteDialog onClose={onClose} id={data.state.id} deleteAction={data.actions} />
      );
    case 'foodFilters':
      return <AllFiltersDialog data={data} onClose={onClose} />;
    case 'foodDetails':
      return (
        <DetailsDialog
          data={data}
          onClose={onClose}
          tabs={{
            mainInfo: <MainInfo />,
            menu: <Menu />,
            partnership: <Partnership tabNumber='3' />,
          }}
          tabList={{
            mainInfo: <Tab label='MAIN INFO' value='1' />,
            menu: <Tab label='MENU' value='2' />,
            partnership: <Tab label='PARTNERSHIP' value='3' />,
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
