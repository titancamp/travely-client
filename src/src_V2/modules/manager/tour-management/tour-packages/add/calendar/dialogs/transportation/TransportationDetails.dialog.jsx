import { DriveEta } from '@mui/icons-material';

import AddSupplierDetails from '../AddSupplier';
import AddTransportation from './Add';

export default function TransportationDetailsDialog(props) {
  return (
    <AddSupplierDetails
      {...props}
      title={'Transportation'}
      icon={<DriveEta color='info' />}
      SupplierComponent={AddTransportation}
    />
  );
}
