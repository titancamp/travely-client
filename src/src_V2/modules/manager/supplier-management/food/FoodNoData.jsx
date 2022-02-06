import image from '../../../../assets/illustrations/food.svg';
import { NoData } from '../components';

export default function FoodLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Food'
      buttonContent={'ADD MY FIRST FOOD SUPPLIER'}
      helperText='Create and view information about your partner guides and agencies. You can assign guides to your tour packages.'
    />
  );
}
