function createData(name, destination, startPoint, duration, attributes, pricePerPerson) {
  return { name, destination, startPoint, duration, attributes, pricePerPerson };
}

export const TransportationTypes = [
  { id: 1, label: 'Agency' },
  { id: 2, label: 'Contractor' },
  { id: 3, label: 'Employee' },
];

export const HeadCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'destination',
    numeric: true,
    disablePadding: false,
    label: 'Destination',
  },
  {
    id: 'startPoint',
    numeric: true,
    disablePadding: false,
    label: 'Start point',
  },
  {
    id: 'duration',
    numeric: true,
    disablePadding: false,
    label: 'Duration',
  },
  {
    id: 'attributes',
    numeric: true,
    disablePadding: false,
    label: 'Attributes',
  },
  {
    id: 'pricePerPerson',
    numeric: true,
    disablePadding: false,
    label: 'Price per person',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
  },
];

export const TableRows = [
  createData(
    'Hiking to mountain Ara',
    'Kotayq',
    'Yerevan, Martiros Saryan Statue',
    '6h',
    ['Boots', 'Sunglasses'],
    '~ 10 000 AMD'
  ),
  createData(
    'Hiking to mountain Ara',
    'Kotayq',
    'Yerevan, Martiros Saryan Statue',
    '6h',
    ['Boots', 'Sunglasses'],
    '~ 10 000 AMD'
  ),
  createData(
    'Hiking to mountain Ara',
    'Kotayq',
    'Yerevan, Martiros Saryan Statue',
    '6h',
    ['Boots', 'Sunglasses'],
    '~ 10 000 AMD'
  ),
];

export const AttributesConstants = ['Sunglasses', 'Boots'];

export const GuidesConstants = [
  {
    experience: '6',
    price: '8000',
    person: 'Karen',
    languages: [
      { id: 1, label: 'English' },
      { id: 2, label: 'Chines' },
      { id: 3, label: 'Spanish' },
    ],
    phone: '77334455',
    id: 1,
  },
  {
    experience: '5',
    price: '3000',
    person: 'Aram',
    languages: [
      { id: 1, label: 'English' },
      { id: 2, label: 'Chines' },
      { id: 3, label: 'Spanish' },
    ],
    phone: '77334455',
    id: 2,
  },
  {
    experience: '4',
    price: '2000',
    person: 'Alex',
    languages: [
      { id: 1, label: 'English' },
      { id: 2, label: 'Chines' },
      { id: 3, label: 'Spanish' },
    ],
    phone: '77334455',
    id: 3,
  },
];
