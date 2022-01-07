import { NoData } from '../../components';
import image from '../../../../../assets/transportation.png';

export default function AccommodationLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Transportation'
      helperText='Here will be helper text, for case when there is not data yet'
    />
  );
}
