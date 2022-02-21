import { Transportation as TransportationMock } from '../mock';
import TransportationItem from './TransportationItem';

export default function AddTransportation(props) {
  return (
    <>
      {TransportationMock.data.map((item, index) => (
        <TransportationItem
          key={index}
          data={item}
          expanded={props.expandedId}
          expandCollapse={props.expandCollapse}
        />
      ))}
    </>
  );
}
