function createData(
  name,
  type,
  region,
  city,
  contactNumber,
  menu,
  pricePerPerson,
  status
) {
  return { name, type, region, city, contactNumber, menu, pricePerPerson, status };
}

export const TransportationTypes = [
  { id: 1, label: 'Agency' },
  { id: 2, label: 'Contractor' },
  { id: 3, label: 'Employee' },
];

export const Languages = [
  { id: 1, label: 'English' },
  { id: 2, label: 'Chines' },
  { id: 3, label: 'Spanish' },
  { id: 4, label: 'Arabic' },
  { id: 5, label: 'Russian' },
  { id: 6, label: 'Armenian' },
];

export const Menus = [
  { id: 1, label: 'Vegan' },
  { id: 2, label: 'Spicy' },
  { id: 3, label: 'Spanish' },
  { id: 4, label: 'Italian' },
  { id: 5, label: 'Mexican' },
  { id: 6, label: 'Healthy breakfast' },
];

export const TableRows = [
  createData(
    'Tsirani',
    'Restaurant',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    ['Vegan, Spicy', 'Italian', 'Mexican'],
    '~ 10 000 AMD',
    'Ready'
  ),
  createData(
    'Tsirani',
    'Restaurant',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    ['Vegan, Spicy', 'Italian', 'Mexican'],
    '~ 10 000 AMD',
    'Ready'
  ),
  createData(
    'Tsirani',
    'Restaurant',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    ['Vegan, Spicy', 'Italian', 'Mexican'],
    '~ 10 000 AMD',
    'Ready'
  ),
];

export const Attachments = ['Special Attributes 2021.pdf', 'Drinks.pdf'];

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
    id: 'menu',
    numeric: true,
    disablePadding: false,
    label: 'Menu',
  },
  {
    id: 'pricePerPerson',
    numeric: true,
    disablePadding: false,
    label: 'Price per person',
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
