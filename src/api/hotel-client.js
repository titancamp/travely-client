import ApiClient from './api';

const HotelClient = {
  addHotel: async function (data) {
    const bodyFormData = new FormData();

    bodyFormData.append('name', data.name);
    bodyFormData.append('stars', data.stars);
    bodyFormData.append('address', data.address);
    bodyFormData.append('latitude', data.latitude || 0);
    bodyFormData.append('longitude', data.longitude || 0);
    bodyFormData.append('contactName', data.contanctName);
    bodyFormData.append('email', data.email);
    bodyFormData.append('phone', data.phone);
    bodyFormData.append('website', data.website);
    bodyFormData.append('attachments', data.attachments.filter(item => !item.hasOwnProperty('blob')));

    const attachmentsToAdd = data.attachments
      .filter(item => item.hasOwnProperty('blob'))
      .map(item => item.blob);

    for (let i = 0; i < attachmentsToAdd.length; i++) {
      bodyFormData.append('attachmentsToAdd', attachmentsToAdd[i]);
    }

    return await ApiClient.post('/api/v1/properties', bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  editHotel: async function (data) {
    return await setTimeout(() => {
      return data;
    }, 0);
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
