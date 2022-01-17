import { Dialog } from '@mui/material';
import DeleteDialog from '../../components/dialogs/Delete.dialog';
import AllFiltersDialog from './AllFilters.dialog';
import FoodDetailsDialog from './FoodDetails/FoodDetails.dialog';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'delete':
      return (
        <DeleteDialog onClose={onClose} id={data.state.id} deleteAction={data.actions} />
      );
    case 'foodFilters':
      return <AllFiltersDialog data={data} onClose={onClose} />;
    case 'foodDetails':
      return <FoodDetailsDialog data={data} onClose={onClose} />;
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
