export const currencyList = ['AMD', 'USD', 'RUR', 'EUR', 'GBP', 'AED'];

export const columnTypes = {
  text: 'text',
  price: 'price',
  date: 'date',
  select: 'select',
  file: 'file',
  inputNumber: 'inputNumber',
};

export const columns = (() => ({
  Accomodation: {
    name: {
      label: 'Name',
      type: columnTypes.text,
    },
    roomType: {
      label: 'Room Type',
      type: columnTypes.text,
    },
    count: {
      label: 'Number of Rooms',
      type: columnTypes.text,
    },
    days: {
      label: 'Days',
      type: columnTypes.text,
    },
    currency: {
      label: 'Currency',
      type: columnTypes.text,
    },
    costPerDay: {
      label: 'Cost Per Day',
      type: columnTypes.price,
    },
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.price,
    },
  },
  Transportation: {
    name: {
      label: 'Name',
      type: columnTypes.text,
    },
    priceType: {
      label: 'Price Type',
      type: columnTypes.text,
    },
    currency: {
      label: 'Currency',
      type: columnTypes.text,
    },
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.price,
    },
  },
  Food: {
    name: {
      label: 'Name',
      type: columnTypes.text,
    },
    priceType: {
      label: 'Price Type',
      type: columnTypes.text,
    },
    guests: {
      label: 'Guests',
      type: columnTypes.text,
    },
    currency: {
      label: 'Currency',
      type: columnTypes.text,
    },
    costPerGuest: {
      label: 'Cost Per Guest',
      type: columnTypes.price,
    },
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.price,
    },
  },
  Guide: {
    name: {
      label: 'Name',
      type: columnTypes.text,
    },
    priceType: {
      label: 'Price Type',
      type: columnTypes.text,
    },
    days: {
      label: 'Days',
      type: columnTypes.text,
    },
    currency: {
      label: 'Currency',
      type: columnTypes.text,
    },
    costPerDay: {
      label: 'Cost Per Day',
      type: columnTypes.price,
    },
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.price,
    },
  },
  Activity: {
    name: {
      label: 'Name',
      type: columnTypes.text,
    },
    priceType: {
      label: 'Price Type',
      type: columnTypes.text,
    },
    guests: {
      label: 'Guests',
      type: columnTypes.text,
    },
    currency: {
      label: 'Currency',
      type: columnTypes.text,
    },
    costPerGuest: {
      label: 'Cost Per Guest',
      type: columnTypes.price,
    },
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.price,
    },
  },
}))();
