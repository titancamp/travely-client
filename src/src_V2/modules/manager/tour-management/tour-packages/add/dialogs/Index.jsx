import { Dialog } from '@mui/material';
import AccommodationDetailsDialog from './AccommodationDetails.dialog';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'add-accommodation':
      return <AccommodationDetailsDialog data={data} onClose={onClose} />;
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
