import ApiClient from "./api";

const ActivityClient = {
  getActivities: async function () {
    return ApiClient.get(`/api/v1/Service`);
  },
  addActivity: async function (data) {
    return ApiClient.post(`/api/v1/Service`, data);
  },
  editActivity: async function (data) {
    return await ApiClient.put("/api/v1/service", data).then(
      (response) => response.data
    );
  },
  deleteActivity: async function (id) {
    return await ApiClient.delete(`/api/v1/service/${id}`).then(
      (response) => response.data
    );
  },
  getActivityTypes: async function (nameSearch) {
    return await ApiClient.get(
      `/api/v1/service/activitytype?activityTypeName=${nameSearch || ""}`
    ).then((response) => response.data);
  },
};

export default ActivityClient;
