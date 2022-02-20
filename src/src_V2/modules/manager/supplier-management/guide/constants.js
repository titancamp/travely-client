function createData(name, type, region, city, contactNumber, languages, price, status) {
  return { name, type, region, city, contactNumber, languages, price, status };
}

export const Sex = [
  { id: 1, label: 'male' },
  { id: 2, label: 'female' },
];

export const AddGuide = {
  fileSize: 1024 ** 2 * 20,
  acceptedFileTypes: ['image/png', 'image/jpg', 'image/jpeg'],
  errorMessage: 'compatible formats are .png, .jpg and file limit is up to 20mb',
};

export const TransportationTypes = [
  { id: 1, label: 'Agency' },
  { id: 2, label: 'Contractor' },
  { id: 3, label: 'Employee' },
];

export const GuideTypes = [
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
    id: 'languages',
    numeric: true,
    disablePadding: false,
    label: 'Languages',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
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

export const TableRows = [
  createData(
    'Tsirani',
    'Agency',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    ['Armenian', 'Russian'],
    '~ 10 000 AMD',
    'Ready'
  ),
  createData(
    'Kathryn Murphy',
    'Individual',
    'Yerevan',
    'Yerevan',
    '+374 11 11 11 11',
    ['English', 'Russian', 'Armenian'],
    '~ 10 000 AMD',
    'Ready'
  ),
  createData(
    'Tsirani',
    'Agency',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    ['Armenian'],
    '~ 10 000 AMD',
    'Ready'
  ),
];

export const TableRowsData = [
  [
    'Tsirani',
    'Agency',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    ['Armenian', 'Russian'],
    '~ 10 000 AMD',
    'Ready',
  ],
  [
    'Kathryn Murphy',
    'Individual',
    'Yerevan',
    'Yerevan',
    '+374 11 11 11 11',
    ['English', 'Russian', 'Armenian'],
    '~ 10 000 AMD',
    'Ready',
  ],
  [
    'Tsirani',
    'Agency',
    'Kotayq',
    'Abovyan',
    '+374 11 11 11 11',
    ['Armenian'],
    '~ 10 000 AMD',
    'Ready',
  ],
];

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
    skills: ['skill1', 'skill2', 'skill3'],
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
    skills: ['skill1', 'skill2', 'skill3'],
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
    skills: ['skill1', 'skill2', 'skill3'],
    phone: '77334455',
    id: 3,
  },
];
