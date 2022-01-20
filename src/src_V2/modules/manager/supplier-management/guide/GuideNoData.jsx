import { NoData } from '../components';
import image from '../../../../assets/guide.png';

export default function GuideLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Guide'
      helperText='Create and view information about your partner guides and agencies. You can assign guides to your tour packages.'
    />
  );
}
