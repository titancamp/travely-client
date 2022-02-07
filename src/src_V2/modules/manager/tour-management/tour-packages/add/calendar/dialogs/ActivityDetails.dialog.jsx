import { DirectionsWalk } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

import AddSupplierDetails from './AddSupplier.dialog';
import AccommodationSupplier from './accommodation/AccommodationItem';
import { Accommodation as AccommodationMock } from './mock';

function AddAccommodation(props) {
  return (
    <>
      {AccommodationMock.data.map((item, index) => (
        <AccommodationSupplier
          key={index}
          data={item}
          expanded={props.expandedId}
          expandCollapse={props.expandCollapse}
        />
      ))}
    </>
  );
}

export default function AccommodationDetailsDialog(props) {
  return (
    <AddSupplierDetails
      {...props}
      title='Activity'
      icon={<DirectionsWalk style={{ color: pink[500] }} />}
      SupplierComponent={AddAccommodation}
    />
  );
}