import { NoData } from '../components';
import image from '../../../../assets/food.png';

export default function FoodLandingPage() {
  return (
    <NoData
      image={image}
      pageName='Food Supplier'
      helperText='Here will be helper text, for case when there is not data yet'
    />
  );
}