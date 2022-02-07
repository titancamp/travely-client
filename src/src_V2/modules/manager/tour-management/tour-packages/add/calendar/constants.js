import { ViewTypes } from 'react-big-scheduler';

export const ViewsConfig = {
  minuteStep: 60,
  dayCellWidth: 120,
  weekCellWidth: 400,
  weekResourceTableWidth: 40,
  dayResourceTableWidth: 40,
  monthResourceTableWidth: 40,
  eventItemHeight: 31,
  tableHeaderHeight: 33,
  eventItemLineHeight: 33,
  selectedAreaColor: '#75757550',
  nonWorkingTimeHeadBgColor: 'white',
  nonWorkingTimeBodyBgColor: 'white',
  scrollToSpecialMomentEnabled: false,
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

export const SchedulerInitialData = {
  resources: [
    {
      id: 'accommodation',
      name: '',
    },
    {
      id: 'food',
      name: '',
    },
    {
      id: 'transportation',
      name: '',
    },
    {
      id: 'guide',
      name: '',
    },
    {
      id: 'activity',
      name: '',
    },
  ],
  events: [],
};

export const eventColorStyles = {
  accommodation: {
    border: 'rgba(248, 128, 120, 0.3)',
    background: '#FEF2F1',
  },
  food: {
    border: 'rgba(255, 181, 71, 0.4)',
    background: '#FFF8ED',
  },
  transportation: {
    border: 'rgba(100, 182, 247, 0.3)',
    background: '#F0F8FE',
  },
  guide: {
    border: 'rgba(123, 198, 126, 0.3)',
    background: '#EBF6EC',
  },
  activity: {
    border: 'rgba(226, 130, 228, 0.4)',
    background: '#FCF3FC',
  },
};
