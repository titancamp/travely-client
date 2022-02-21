import { Activity as ActivityMock } from '../mock';
import ActivityItem from './ActivityItem';

export default function AddActivity(props) {
  return (
    <>
      {ActivityMock.data.map((item, index) => (
        <ActivityItem
          key={index}
          data={item}
          expanded={props.expandedId}
          expandCollapse={props.expandCollapse}
        />
      ))}
    </>
  );
}
