import AccommodationDetailsDialog from './AccommodationDetails.dialog';
import ActivityDetailsDialog from './ActivityDetails.dialog';
import FoodDetailsDialog from './FoodDetails.dialog';
import GuideDetailsDialog from './GuideDetails.dialog';
import TransportationDetailsDialog from './TransportationDetails.dialog';
import { BootstrapDialog } from './component';

function CurrentDialog({ data, onClose }) {
  switch (data.mode) {
    case 'accommodation':
      return <AccommodationDetailsDialog data={data} onClose={onClose} />;
    case 'food':
      return <FoodDetailsDialog data={data} onClose={onClose} />;
    case 'transportation':
      return <TransportationDetailsDialog data={data} onClose={onClose} />;
    case 'activity':
      return <ActivityDetailsDialog data={data} onClose={onClose} />;
    case 'guide':
      return <GuideDetailsDialog data={data} onClose={onClose} />;
    default:
      return null;
  }
}

export default function DialogManager({ data, onShowHideDialog }) {
  const onClose = () => onShowHideDialog({ mode: '', open: false });

  return (
    <BootstrapDialog open={data.open} onClose={onClose}>
      <CurrentDialog data={data} onClose={onClose} />
    </BootstrapDialog>
  );
}
