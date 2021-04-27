import ApiClient from "./api";

const BookingClient = {
  getBookings: async function () {
    return ApiClient.get(`/api/v1/Booking`);
  },
};

export default BookingClient;