import AccommodationDetailsDialog from './accommodation/AccommodationDetails.dialog';
import ActivityDetailsDialog from './activity/ActivityDetails.dialog';
import { BootstrapDialog } from './component';
import FoodDetailsDialog from './food/FoodDetails.dialog';
import GuideDetailsDialog from './guide/GuideDetails.dialog';
import TransportationDetailsDialog from './transportation/TransportationDetails.dialog';

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
