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
        path: '/manager/tour-packages',
      },
      {
        title: 'Activities',
        path: '/manager/activity',
      },
      {
        title: 'Guides',
        path: '/manager/guide',
      },
    ],
  },
  {
    title: 'Reporting',
    path: '/manager/reporting',
    icon: <BarChart />,
  },
  {
    collapsibleId: 3,
    title: 'Financial Management',
    icon: <AttachMoney />,
    subPages: [
      {
        title: 'Receivables',
        path: '/manager/receivables',
      },
      {
        title: 'Payables',
        path: '/manager/payable',
      },
    ],
  },
  {
    title: 'User Management',
    path: '/manager/user-management',
    icon: <People />,
  },
];
