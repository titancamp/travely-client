import {
  Work,
  People,
  BarChart,
  Dashboard,
  AttachMoney,
  PlaylistAddCheck,
  AirplanemodeActive,
} from '@mui/icons-material';

export const managerSidebarConfig = [
  {
    title: 'Dashboard',
    path: '/manager/dashboard',
    icon: <Dashboard />,
  },
  {
    title: 'To Do',
    path: '/manager/todo',
    icon: <PlaylistAddCheck />,
  },
  {
    collapsibleId: 1,
    title: 'Tour Management',
    icon: <AirplanemodeActive />,
    subPages: [
      {
        title: 'Tour Templates',
        path: '/manager/tour-templates',
      },
      {
        title: 'Tour Packages',
        path: '/manager/tour-packages',
      },
    ],
  },
  {
    title: 'Supplier Management',
    icon: <Work />,
    collapsibleId: 2,
    subPages: [
      {
        title: 'Accommodation',
        path: '/manager/accommodation',
      },
      {
        title: 'Transportation',
        path: '/manager/transportation',
      },
      {
        title: 'Food',
        path: '/manager/food',
      },
      {
        title: 'Activities',
        path: '/manager/activities',
      },
      {
        title: 'Guides',
        path: '/manager/guides',
      },
      {
        title: 'Extra Services',
        path: '/manager/extra-services',
      },
    ],
  },
  {
    title: 'Reporting',
    path: '/manager/reporting',
    icon: <BarChart />,
  },
  {
    title: 'Financial Management',
    path: '/manager/financial',
    icon: <AttachMoney />,
  },
  {
    title: 'User Management',
    path: '/manager/user-management',
    icon: <People />,
  },
];
