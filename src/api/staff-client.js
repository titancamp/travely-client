import ApiClient from "./api";
import appConfig from "../app-config.json";

const StaffClient = {
  get: function (id) {
    return ApiClient.get(`/api/users/${id}`, {
      baseURL: appConfig.authURL,
    });
  },
  create: function (formData) {
    return ApiClient.post(`/api/users`, formData, {
      baseURL: appConfig.authURL,
    });
  },
  update: function (id, formData) {
    return ApiClient.put(`/api/users/${id}`, formData, {
      baseURL: appConfig.authURL,
    });
  },
  delete: function (id) {
    return ApiClient.delete(`/api/users/${id}`, {
      baseURL: appConfig.authURL,
    });
  },
  getAll: function () {
    return ApiClient.get("/api/users", {
      baseURL: appConfig.authURL,
    });
  },
};

export default StaffClient;
