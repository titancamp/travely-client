import ApiClient from './api';

const ActivityClient = {
  addActivity: async function (data) {

    const activityFormData = new FormData();
    const activityType = {
        id: null,
        activityName: data.type,
        agencyId: 1  // agencyId will get from identity - or in api part or from frontend need to clarify
    };

    activityFormData.append('type', activityType);
    activityFormData.append('name', data.name);
    activityFormData.append('address', data.address);
    activityFormData.append('contactName', data.contanctName);
    activityFormData.append('email', data.email);
    activityFormData.append('phone', data.phone);
    activityFormData.append('website', data.website);
    activityFormData.append('price', data.price);
    activityFormData.append('currency', "AMD"); //only amd for now
    activityFormData.append('changeUser', 1); //changeUser will get from identity / or frontend need to clarify

    return await ApiClient.post('/api/v1/service', activityFormData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },

  editActivity: async function (data) {
    const activityFormData = new FormData();
    const activityType = {
        id: null, //need to add from editactivity component 
        activityName: data.type,
        agencyId: 1  // agencyId will get from identity - or in api part or from frontend need to clarify
    };

    activityFormData.append('id', data.id);
    activityFormData.append('type', activityType);
    activityFormData.append('name', data.name);
    activityFormData.append('address', data.address);
    activityFormData.append('contactName', data.contanctName);
    activityFormData.append('email', data.email);
    activityFormData.append('phone', data.phone);
    activityFormData.append('website', data.website);
    activityFormData.append('price', data.price);
    activityFormData.append('currency', "AMD"); //only amd for now
    activityFormData.append('changeUser', 1); //changeUser will get from identity / or frontend need to clarify

    return await ApiClient.put('/api/v1/service', activityFormData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },

  getActivities: async function (agencyId) {
    return await ApiClient.get(`/api/v1/service/${agencyId}`)
      .then(response => response.data);
  }
};

export default ActivityClient;
