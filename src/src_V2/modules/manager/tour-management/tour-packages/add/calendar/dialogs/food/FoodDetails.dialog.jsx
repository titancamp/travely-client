import { Fastfood } from '@mui/icons-material';
import { orange } from '@mui/material/colors';

import AddSupplierDetails from '../AddSupplier';
import AddFood from './Add';

export default function FoodDetailsDialog(props) {
  return (
    <AddSupplierDetails
      {...props}
      title={'Food'}
      icon={<Fastfood style={{ color: orange[500] }} />}
      SupplierComponent={AddFood}
    />
  );
}
