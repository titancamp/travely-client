import { Dialog } from '@mui/material';
import ViewGuideDialog from './ViewGuide.dialog';
import AllFiltersDialog from './AllFilters.dialog';
import AddEditGuideDialog from './AddEditGuide.dialog';
import Map from '../../components/dialogs/Map.dialog';
import DeleteDialog from '../../components/dialogs/Delete.dialog';
import GuideDetailsDialog from './GuideDetails/GuideDetails.dialog';

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
      return <GuideDetailsDialog data={data} onClose={onClose} />;
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
