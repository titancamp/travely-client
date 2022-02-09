import ApartmentIcon from '@material-ui/icons/Apartment';
import GroupIcon from '@material-ui/icons/Group';
import HotelIcon from '@material-ui/icons/Hotel';
import PublicIcon from '@material-ui/icons/Public';
import React from 'react';

import { ContentArea } from '../common/content-area';
import { Sidebar } from '../common/sidebar';
import ManageActivities from './activities/manage-activities';
import AgencyProfile from './agency/agency-profile';
import ManageHotels from './hotels/manage-hotels';
import ManageStaff from './staff/manage-staff';

const pages = [
  {
    title: 'Agency Profile',
    path: '/admin/profile',
    icon: <ApartmentIcon />,
    component: AgencyProfile,
  },
  {
    title: 'Manage Staff',
    path: '/admin/staff',
    icon: <GroupIcon />,
    component: ManageStaff,
  },
  {
    title: 'Manage Hotels',
    path: '/admin/hotels',
    icon: <HotelIcon />,
    component: ManageHotels,
  },
  {
    title: 'Manage Activities',
    path: '/admin/activity',
    icon: <PublicIcon />,
    component: ManageActivities,
  },
];

export default function Admin() {
  return (
    <React.Fragment>
      <Sidebar pages={pages} />
      <ContentArea pages={pages} />
    </React.Fragment>
  );
}
