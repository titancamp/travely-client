import { Accommodation as AccommodationMock } from '../mock';
import AccommodationItem from './AccommodationItem';

export default function AddAccommodation(props) {
  return (
    <>
      {AccommodationMock.data.map((item, index) => (
        <AccommodationItem
          key={index}
          data={item}
          expanded={props.expandedId}
          expandCollapse={props.expandCollapse}
        />
      ))}
    </>
  );
}
