// These files are potentially removable
import paymentHistory from './payment-history';

function createPayable(
  paymentId,
  tourId,
  tourName,
  supplier,
  currency,
  plannedCost,
  actualCost,
  paidCost,
  status,
  createdDate,
  invoiceId,
  dueDate,
  paymentDate,
  paymentType,
  invoiceAttachment,
  payableId,
  readyDate,
  paymentHistory,
  notes
) {
  return {
    paymentId,
    tourId,
    tourName,
    supplier,
    currency,
    plannedCost,
    actualCost,
    paidCost,
    status,
    createdDate,
    invoiceId,
    dueDate,
    paymentDate,
    paymentType,
    invoiceAttachment,
    payableId,
    readyDate,
    paymentHistory,
    notes,
  };
}

const payablesList = () => [
  createPayable(
    305,
    18759,
    '5 day tour to Tsakhadzor',
    'Tatev Hotel',
    'AMD',
    400,
    400,
    20,
    1,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z',
    [
      paymentHistory(1, '134252-89', '1000', '2021-12-26T09:36:19Z', 1),
      paymentHistory(2, '134252-89', '5000', '2021-12-26T09:36:19Z', 2),
      paymentHistory(3, '134252-89', '1000', '2021-12-26T09:36:19Z', 2),
    ]
  ),
  createPayable(
    452,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    400,
    20,
    2,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    2,
    false,
    17887,
    '2021-12-26T09:36:19Z',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  ),
  createPayable(
    262,
    18759,
    'Very very looooooooooooooooooooooooooooooooooooong Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    400,
    20,
    3,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z',
    [paymentHistory(4, '134252-89', '1000', '2021-12-26T09:36:19Z', 2)],
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget faucibus augue purus, faucibus rhoncus. Laoreet iaculis pharetra fringilla facilisis suscipit dui pellentesque. Fringilla quam mauris sed ornare. Consectetur ac gravida sollicitudin sed ut ultrices. Ut eleifend ultrices orci.'
  ),
  createPayable(
    159,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    300,
    20,
    4,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    356,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    500,
    20,
    4,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    2,
    false,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    408,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    400,
    20,
    5,
    'Mon Jan 03 2022 17:06:16 GMT+0400 (Armenia Standard Time)',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    237,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    600,
    1000,
    20,
    1,
    'Mon Jan 03 2022 16:31:13 GMT+0400 (Armenia Standard Time)',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    true,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    375,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    400,
    20,
    5,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    518,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    400,
    20,
    4,
    'Mon Jan 03 2022 16:31:13 GMT+0400 (Armenia Standard Time)',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    true,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    392,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    400,
    20,
    3,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    'Mon Jan 03 2022 17:06:16 GMT+0400 (Armenia Standard Time)',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    318,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    400,
    20,
    2,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    2,
    true,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    360,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    400,
    10,
    20,
    1,
    '2021-12-26T09:36:19Z',
    8,
    'Mon Jan 03 2022 17:06:16 GMT+0400 (Armenia Standard Time)',
    '2021-12-26T09:36:19Z',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    437,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    9000000000000,
    400,
    20,
    3,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    438,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    800,
    400,
    20,
    3,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    439,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    800,
    300,
    20,
    3,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    true,
    17887,
    '2021-12-26T09:36:19Z'
  ),
  createPayable(
    440,
    18759,
    'Trip to Tatev',
    'Tatev Hotel',
    'AMD',
    1000,
    400,
    20,
    3,
    '2021-12-26T09:36:19Z',
    8,
    '2021-12-26T09:36:19Z',
    '2021-12-26T09:36:19Z',
    1,
    false,
    17887,
    '2021-12-26T09:36:19Z'
  ),
];

export default payablesList;
