import { Person } from '@mui/icons-material';

import AddSupplierDetails from './AddSupplierDetails.dialog';
import { AccommodationSupplier } from './component';
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
      title={'Guide'}
      icon={<Person color='success' />}
      SupplierComponent={AddAccommodation}
    />
  );
}
