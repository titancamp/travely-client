import { Food as FoodMock } from '../mock';
import FoodItem from './FoodItem';

export default function AddFood(props) {
  return (
    <>
      {FoodMock.data.map((item, index) => (
        <FoodItem
          key={index}
          data={item}
          expanded={props.expandedId}
          expandCollapse={props.expandCollapse}
        />
      ))}
    </>
  );
}
