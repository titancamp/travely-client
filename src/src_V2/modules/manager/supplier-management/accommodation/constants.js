import { Button } from '@mui/material';

import styles from './list/style.module.css';

function createData(
  id,
  name,
  type,
  region,
  city,
  contactNumber,
  contactPerson,
  email,
  status
) {
  return { id, name, type, region, city, contactNumber, contactPerson, email, status };
}

export const RoomTypes = [
  { id: 1, label: 'Standard Single' },
  { id: 2, label: 'Standard Double' },
  { id: 4, label: 'Twin' },
  { id: 5, label: 'Queen' },
  { id: 6, label: 'King' },
  { id: 7, label: 'Suite' },
  { id: 8, label: 'Presidential Suite' },
  { id: 9, label: 'Villa' },
];

export const RoomServices = [
  { id: 1, label: 'Breakfast ' },
  { id: 2, label: 'Free Wifi' },
  { id: 3, label: 'Room service' },
  { id: 4, label: 'Hearing accessible' },
  { id: 5, label: 'Accessible room' },
  { id: 6, label: 'Pet friendly' },
  { id: 7, label: 'Parking' },
  { id: 8, label: 'Fitness' },
  { id: 9, label: 'Massage' },
  { id: 10, label: 'Smoking' },
  { id: 11, label: 'Air conditioning' },
  { id: 12, label: 'Heating' },
  { id: 13, label: 'Private bathroom' },
  { id: 14, label: 'Hair dryer' },
];

export const AccommodationTypes = [
  { id: 1, label: 'Hostels' },
  { id: 2, label: 'Guest Houses' },
  { id: 3, label: 'Private Houses' },
  { id: 4, label: 'Hotel' },
];

export const Regions = [
  { id: 1, label: 'Aragatsotn' },
  { id: 2, label: 'Ararat' },
  { id: 3, label: 'Armavir' },
  { id: 4, label: 'Gegharkunik' },
  { id: 5, label: 'Kotayk' },
  { id: 5, label: 'Lori' },
  { id: 7, label: 'Shirak' },
  { id: 8, label: 'Syunik' },
  { id: 9, label: 'Tavush' },
  { id: 10, label: 'Vayots Dzor' },
  { id: 11, label: 'Yerevan' },
];

export const HotelServices = [
  { id: 1, label: 'Parking' },
  { id: 2, label: 'Free Wifi' },
  { id: 3, label: 'Room Service' },
  { id: 4, label: '24-Hour Guest Reception' },
  { id: 5, label: 'Complimentary Toiletries' },
  { id: 6, label: 'Healthy Breakfast' },
  { id: 7, label: 'Ample Wall Outlets' },
  { id: 8, label: 'Hair Styling Tools' },
  { id: 9, label: 'Flexible Checkout' },
  { id: 10, label: 'Pool' },
  { id: 11, label: 'Mini-fridge' },
  { id: 12, label: 'Clothing Iron' },
  { id: 13, label: 'Business Facilities' },
  { id: 14, label: 'Transportation Information' },
  { id: 15, label: 'Free Breakfast' },
  { id: 16, label: 'Laundry Services' },
  { id: 17, label: 'Spa & Wellness Amenities' },
  { id: 18, label: 'Exercise Facilities and Accessories' },
  { id: 19, label: 'Entertainment' },
  { id: 20, label: 'Cribs & Cots for Children' },
  { id: 21, label: 'Custom Offers' },
  { id: 22, label: 'Curated Experiences' },
  { id: 23, label: 'Fancy Bathrobes' },
  { id: 24, label: 'Stain Remover Wipes' },
  { id: 25, label: 'Kid-friendly Rooms and Products' },
  { id: 26, label: 'Premium Bedding' },
  { id: 27, label: 'Pet-friendly Rooms' },
  { id: 28, label: 'Champagne Bar' },
];

export const RoomsConstants = [
  {
    beds: '6',
    price: '8000',
    type: {
      id: 1,
      label: 'Standard Single',
    },
    quantity: '11',
    services: [],
    additionalBeds: '',
    id: 1,
  },
  {
    beds: '5',
    price: '3000',
    type: {
      id: 4,
      label: 'Twin',
    },
    quantity: '17',
    services: [],
    additionalBeds: '',
    id: 2,
  },
  {
    beds: '4',
    price: '2000',
    type: {
      id: 1,
      label: 'Standard Single',
    },
    quantity: '22',
    services: [],
    additionalBeds: '',
    id: 3,
  },
];

export const TableRows = [
  createData(
    '1',
    'Mariot',
    'Hotel',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    'Name Lastname',
    'customer.care@marriott.com',
    <Button
      onClick={(event) => {
        event.stopPropagation();
      }}
      variant='contained'
      className={styles.btn}
      component='span'
    >
      Ready
    </Button>
  ),
  createData(
    '2',
    'Tufenkyan',
    'Hotel',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    'Name Lastname',
    'customer.care@marriott.com',
    <Button
      onClick={(event) => {
        event.stopPropagation();
      }}
      variant='contained'
      className={`${styles.btn} ${styles.secondaryBtn}`}
      component='span'
    >
      Missed Price
    </Button>
  ),
  createData(
    '3',
    'Multi rest',
    'Hotel',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    'Name Lastname',
    'customer.care@marriott.com',
    <Button
      onClick={(event) => {
        event.stopPropagation();
      }}
      variant='contained'
      className={styles.btn}
      component='span'
    >
      Ready
    </Button>
  ),
];

export const HeadCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'region',
    numeric: true,
    disablePadding: false,
    label: 'Region',
  },
  {
    id: 'city',
    numeric: true,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'contactNumber',
    numeric: true,
    disablePadding: false,
    label: 'Contact number',
  },
  {
    id: 'contactPerson',
    numeric: true,
    disablePadding: false,
    label: 'Contact Person',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
  },
];
