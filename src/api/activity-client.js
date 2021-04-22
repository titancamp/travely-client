import ApiClient from "./api";

const ActivityClient = {
  getActivities: async function (agencyId) {
    return ApiClient.get(`/api/v1/Service/${agencyId}`)
  },
  addActivity: async function (data) {
    return ApiClient.post(`/api/v1/Service`, data)
  },
  editActivity: async function (data) {
    return await setTimeout(() => {
      return data;
    }, 0);
  },
};

export default ActivityClient;
