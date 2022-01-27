import AccommodationDetailsDialog from './AccommodationDetails.dialog';
import { BootstrapDialog } from './component';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'add-accommodation':
      return <AccommodationDetailsDialog data={data} onClose={onClose} />;
    default:
      return <AccommodationDetailsDialog data={data} onClose={onClose} />;
  }
}

export default function DialogManager({ data, onShowHideDialog }) {
  const onClose = () => onShowHideDialog({ mode: '', open: false });

  return (
    <BootstrapDialog open={true} onClose={onClose}>
      <CurrentDialog data={data} onClose={onClose} />
    </BootstrapDialog>
  );
}
