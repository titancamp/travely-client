function createData(name, car, type, city, contactNumber, contactPerson) {
  return { name, car, type, city, contactNumber, contactPerson };
}

export const TableRows = [
  createData(
    'Auto Park Name Example',
    'Hyundai Veloster (st4)',
    'Transportation Agency',
    'Abovyan',
    '+374 11 11 11 11',
    'Name Lastname'
  ),
  createData(
    'Savannah Nguyen',
    'Hyundai Veloster (st4)',
    'Individual Contractor',
    'Yerevan',
    '+374 11 11 11 11',
    'Name Lastname'
  ),
  createData(
    'Kathryn Murphy',
    'Volkswagen Touareg (st6)',
    'Transportation Agency',
    'Dilijan',
    '+374 11 11 11 11',
    'Name Lastname'
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
    id: 'car',
    numeric: true,
    disablePadding: false,
    label: 'Car',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
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
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
  },
];

export const TransportationTypes = [
  { id: 1, label: 'Agency' },
  { id: 2, label: 'Contractor' },
  { id: 3, label: 'Employee' },
];

export const License = [
  { id: 1, label: 'A' },
  { id: 2, label: 'B' },
  { id: 3, label: 'C' },
  { id: 4, label: 'D' },
];

export const Languages = [
  { id: 1, label: 'English' },
  { id: 2, label: 'Chines' },
  { id: 3, label: 'Spanish' },
  { id: 4, label: 'Arabic' },
  { id: 5, label: 'Russian' },
  { id: 6, label: 'Armenian' },
];
