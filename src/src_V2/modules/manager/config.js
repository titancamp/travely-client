import {
  AirplanemodeActive,
  AttachMoney,
  BarChart,
  Dashboard,
  People,
  PlaylistAddCheck,
  Work,
} from '@mui/icons-material';

export const managerSidebarConfig = [
  {
    title: 'Dashboard',
    path: '/manager/dashboard',
    icon: <Dashboard />,
  },
  {
    title: 'To Do List',
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
        path: '/manager/tour-package',
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
    collapsibleId: 4,
    icon: <BarChart />,
    subPages: [
      {
        title: 'Tour Report',
        path: '/manager/tour-report',
      },
      {
        title: 'Participant Report',
        path: '/manager/participant-report',
      },
      {
        title: 'Supplier Report',
        path: '/manager/supplier-report',
      }
    ]
  },
  {
    collapsibleId: 3,
    title: 'Financial Management',
    icon: <AttachMoney />,
    subPages: [
      {
        title: 'Receivables',
        path: '/manager/receivable',
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
