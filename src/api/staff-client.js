import ApiClient from "./api";

const StaffClient = {
  get: function (id) {
    return ApiClient.get(`/api/users/${id}`);
  },
  create: function (formData) {
    return ApiClient.put(`/api/users`, formData);
  },
  update: function (id, formData) {
    return ApiClient.put(`/api/users/${id}`, formData);
  },
  delete: function (id) {
    return ApiClient.delete(`/api/users/${id}`);
  },
  getAll: function () {
    return ApiClient.get("/api/users");
  },
};

export default StaffClient;
