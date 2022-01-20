import { NoData } from '../components';
import image from '../../../../assets/images/accommodation.png';

export default function AccommodationLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Accommodation'
      helperText='Here will be helper text, for case when there is not data yet'
    />
  );
}
