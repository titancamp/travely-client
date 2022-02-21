import { Person } from '@mui/icons-material';

import AddSupplierDetails from '../AddSupplier';
import AddGuide from './Add';

export default function GuideDetailsDialog(props) {
  return (
    <AddSupplierDetails
      {...props}
      title={'Guide'}
      icon={<Person color='success' />}
      SupplierComponent={AddGuide}
    />
  );
}
