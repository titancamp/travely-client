import { Dialog } from '@mui/material';
import ActivitiesDetailsDialog from './ActivityDetails/ActivitiesDetails.dialog';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'activityDetails':
      return <ActivitiesDetailsDialog data={data} onClose={onClose} />;
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
    <Dialog open={data.open} onClose={onClose} fullWidth PaperProps={{ width: 750 }}>
      <CurrentDialog data={data} onClose={onClose} />
    </Dialog>
  );
}
