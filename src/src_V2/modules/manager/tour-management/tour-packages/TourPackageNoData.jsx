import image from '../../../../assets/illustrations/accommodation.svg';
import { NoData } from '../../supplier-management/components';

export default function TourPackagesLandingPage() {
  return (
    <NoData
      image={image}
      pageName='There are no tour packages to show'
      buttonContent={'ADD MY FIRST TOUR PACKAGE'}
      helperText='Get started by creating a tour package. All your tour packages will be displayed on this page.'
    />
  );
}
