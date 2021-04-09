import ApiClient from "./api";

const StaffClient = {
  get: function (id) {
    // returns Promise
    return ApiClient.get(`/api/users/${id}`);
  },
  create: function (formData) {
    // returns Promise
    return ApiClient.put(`/api/users`, formData, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  },
  update: function (id, formData) {
    // returns Promise
    return ApiClient.put(`/api/users/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  },
  delete: function (id) {
    // returns Promise
    return ApiClient.delete(`/api/users/${id}`);
  },
  getAll: function (formData) {
    // returns Promise
    return ApiClient.get("/api/users");
  },
};

export default StaffClient;
