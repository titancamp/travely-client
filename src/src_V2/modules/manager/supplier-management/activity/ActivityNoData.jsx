import { NoData } from '../components';
import image from '../../../../assets/activity.png';

export default function ActivityLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Activity'
      helperText='Here will be helper text, for case when there is not data yet'
    />
  );
}
