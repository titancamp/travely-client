import { Guide as GuideMock } from '../mock';
import GuideItem from './GuideItem';

export default function AddGuide(props) {
  return (
    <>
      {GuideMock.data.map((item, index) => (
        <GuideItem
          key={index}
          data={item}
          expanded={props.expandedId}
          expandCollapse={props.expandCollapse}
        />
      ))}
    </>
  );
}
