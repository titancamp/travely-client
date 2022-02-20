import image from '../../../../assets/illustrations/food.svg';
import { NoData } from '../components';

export default function FoodLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Food'
      buttonContent={'ADD MY FIRST FOOD SUPPLIER'}
      helperText='Create and view information about the restaurants, cafes and food delivery services you partner with. You can add the saved partners in food service to your tour packages.'
    />
  );
}
