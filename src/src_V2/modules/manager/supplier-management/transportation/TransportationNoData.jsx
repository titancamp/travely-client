import image from '../../../../assets/transportation.svg';
import { NoData } from '../components';

export default function TransportationLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Transportation'
      helperText='Create and view information about your partner transportation agencies. You can add saved transportation methods to your tour packages.'
    />
  );
}
