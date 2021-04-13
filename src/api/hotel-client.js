import ApiClient from "./api";

const HotelClient = {
  addHotel: async function (data) {
    return await ApiClient.post('/api/v1/properties', data)
      .then(response => response.data);
  },
  editHotel: async function (data) {
    return await ApiClient.put('/api/v1/properties', data)
      .then(response => response.data);
  },
  getHotelById: async function (id) {
    return await ApiClient.get(`/api/v1/properties/${id}`)
      .then(response => response.data);
  },
  getHotels: async function (filter) {
    return await ApiClient.get('/api/v1/properties')
      .then(response => response.data);
  }
};

export default HotelClient;
