const BOOKING_STATUSES = {
  NONE: 0,
  PENDING: 1,
  CONFIRMED: 2,
  CANCELLED: 3,
  properties: {
    0: "None",
    1: "Pending",
    2: "Confirmed",
    3: "Cancelled",
  },
};
Object.freeze(BOOKING_STATUSES);

export default BOOKING_STATUSES;
