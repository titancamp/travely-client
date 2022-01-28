import image from '../../../../assets/activity.svg';
import { NoData } from '../components';

export default function ActivityLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Activity'
      helperText='Create and view activity types your tourists love. You can add saved activities to your tour packages.'
    />
  );
}
