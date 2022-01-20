import { NoData } from '../components';
import image from '../../../../assets/activity.png';

export default function ActivityLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Activity'
      helperText='Create and view activity types your tourists love. You can add saved activities to your tour packages.'
    />
  );
}
