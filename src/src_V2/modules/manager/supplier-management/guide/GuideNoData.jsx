import { NoData } from '../components';
import image from '../../../../assets/images/guide.png';

export default function GuideLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Guide'
      helperText='Here will be helper text, for case when there is not data yet'
    />
  );
}
