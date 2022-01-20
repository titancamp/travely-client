import { NoData } from '../components';
import image from '../../../../assets/images/transportation.png';

export default function TransportationLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Transportation'
      helperText='Create and view information about your partner transportation agencies. You can add saved transportation methods to your tour packages.'
    />
  );
}
