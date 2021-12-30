import { NoData } from '../../components';
import image from '../../../../../assets/accommodation.png';

//TODO replace with right image
export default function AccommodationLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Transportation'
      helperText='Here will be helper text, for case when there is not data yet'
    />
  );
}
