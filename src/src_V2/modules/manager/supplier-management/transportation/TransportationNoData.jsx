import { NoData } from '../components';
import image from '../../../../assets/images/transportation.png';

export default function TransportationLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Transportation'
      helperText='Here will be helper text, for case when there is not data yet'
    />
  );
}
