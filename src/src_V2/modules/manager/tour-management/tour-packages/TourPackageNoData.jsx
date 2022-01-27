import image from '../../../../assets/accommodation.svg';
import { NoData } from '../../supplier-management/components';

export default function TourPackagesLandingPage() {
  return (
    <NoData
      image={image}
      pageName='There are no tours to show'
      buttonContent={'ADD MY FIRST TOUR PACKAGE'}
      helperText='Get started by creating a tour package. All your tour packages will be displayed on this page.'
    />
  );
}
