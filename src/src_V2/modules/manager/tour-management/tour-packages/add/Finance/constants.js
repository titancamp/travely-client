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
  Accomodations: {
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
      type: columnTypes.text,
    },
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.text,
    },
  },
  Trasnportations: {
    name: {
      label: 'Name',
      type: columnTypes.text,
    },
    priceType: {
      label: 'Price Type',
      type: columnTypes.text,
    },
    /* distance: {
      label: 'Distance',
      type: columnTypes.text,
    },
    pricePerKm: {
      label: 'Price Per Km',
      type: columnTypes.text,
    },
    amount: {
      label: 'Amount',
      type: columnTypes.text,
    },
    days: {
      label: 'Days',
      type: columnTypes.text,
    }, */
    currency: {
      label: 'Currency',
      type: columnTypes.text,
    },
    /* costPerDay: {
      label: 'Cost Per Day',
      type: columnTypes.text,
    }, */
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.text,
    },
  },
  Foods: {
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
      type: columnTypes.text,
    },
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.text,
    },
  },
  Guides: {
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
      type: columnTypes.text,
    },
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.text,
    },
  },
  Activities: {
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
      type: columnTypes.inputNumber,
    },
    currency: {
      label: 'Currency',
      type: columnTypes.text,
    },
    costPerGuest: {
      label: 'Cost Per Guest',
      type: columnTypes.text,
    },
    totalCost: {
      label: 'Total Cost',
      type: columnTypes.text,
    },
  },
}))();
