import { ViewTypes } from 'react-big-scheduler';

export const ViewsConfig = {
  minuteStep: 60,
  dayCellWidth: 120,
  tableHeaderHeight: 30,
  schedulerWidth: 1400,
  nonWorkingTimeHeadBgColor: 'white',
  nonWorkingTimeBodyBgColor: 'white',
  nonAgendaDayCellHeaderFormat: 'HH:mm',
  views: [
    {
      viewName: 'Day',
      viewType: ViewTypes.Day,
    },
    {
      viewName: 'Week',
      viewType: ViewTypes.Week,
      showAgenda: false,
      isEventPerspective: false,
    },
    {
      viewName: 'Month',
      viewType: ViewTypes.Month,
    },
  ],
};

export const DemoData = {
  resources: [
    {
      id: 'r0',
      name: '',
    },
    {
      id: 'r1',
      name: '',
    },
    {
      id: 'r2',
      name: '',
    },
    {
      id: 'r3',
      name: '',
    },
    {
      id: 'r4',
      name: '',
    },
  ],
  events: [],
  eventsForCustomEventStyle: [],
};
