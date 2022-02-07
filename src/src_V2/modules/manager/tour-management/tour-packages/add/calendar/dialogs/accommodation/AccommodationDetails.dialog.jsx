import { Hotel } from '@mui/icons-material';

import AddSupplierDetails from '../AddSupplier.dialog';
import AddAccommodation from './Add';

export default function AccommodationDetailsDialog(props) {
  return (
    <AddSupplierDetails
      {...props}
      title={'Accommodation'}
      icon={<Hotel color='error' />}
      SupplierComponent={AddAccommodation}
    />
  );
}
