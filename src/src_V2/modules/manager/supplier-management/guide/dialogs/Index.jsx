import { Dialog, Tab } from '@mui/material';

import DeleteDialog from '../../components/dialogs/Delete.dialog';
import DetailsDialog from '../../components/dialogs/Details.dialog';
import MainInfo from '../../components/dialogs/MainInfo';
import Map from '../../components/dialogs/Map.dialog';
import Partnership from '../../components/dialogs/Partnership';
import AddEditGuideDialog from './AddEditGuide.dialog';
import AllFiltersDialog from './AllFilters.dialog';
import Guides from './GuideDetails/Guides';
import ViewGuideDialog from './ViewGuide.dialog';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'map':
      return <Map onClose={onClose} />;
    case 'add':
      return <AddEditGuideDialog onClose={onClose} onSuccess={data.actions} />;
    case 'edit':
      return (
        <AddEditGuideDialog
          editMode
          guide={data.state}
          onClose={onClose}
          onSuccess={data.actions}
        />
      );
    case 'view':
      return <ViewGuideDialog data={data} />;
    case 'delete':
      return (
        <DeleteDialog onClose={onClose} id={data.state.id} deleteAction={data.actions} />
      );
    case 'guideFilters':
      return <AllFiltersDialog data={data} onClose={onClose} />;
    case 'guideDetails':
      return (
        <DetailsDialog
          data={data}
          onClose={onClose}
          tabs={{
            mainInfo: <MainInfo />,
            guides: <Guides />,
            partnership: <Partnership tabNumber='3' />,
          }}
          tabList={{
            mainInfo: <Tab label='MAIN INFO' value='1' />,
            guides: <Tab label='GUIDES' value='2' />,
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
    <Dialog
      open={data.open}
      onClose={onClose}
      fullWidth
      PaperProps={{ style: { maxWidth: '750px' } }}
    >
      <CurrentDialog data={data} onClose={onClose} />
    </Dialog>
  );
}
