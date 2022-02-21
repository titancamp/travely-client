import { DirectionsWalk } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

import AddSupplierDetails from '../AddSupplier';
import AddActivity from './Add';

export default function ActivityDetailsDialog(props) {
  return (
    <AddSupplierDetails
      {...props}
      title='Activity'
      icon={<DirectionsWalk style={{ color: pink[500] }} />}
      SupplierComponent={AddActivity}
    />
  );
}
