import { NoData } from '../components';
import image from '../../../../assets/accommodation.png';

export default function AccommodationLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Accommodation'
      helperText='Create and view all your most used accommodations here. You can add saved accommodations to your tour packages.'
    />
  );
}
