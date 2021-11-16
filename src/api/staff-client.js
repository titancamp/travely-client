import ApiClient from "./api";
import appConfig from "../app-config.json";

const authURL = process.env.REACT_APP_AUTH_URL || appConfig.authURL;

const StaffClient = {
  get: function (id) {
    return ApiClient.get(`/api/users/${id}`, {
      baseURL: authURL,
    });
  },
  create: function (formData) {
    return ApiClient.post(`/api/users`, formData, {
      baseURL: authURL,
    });
  },
  update: function (id, formData) {
    return ApiClient.put(`/api/users/${id}`, formData, {
      baseURL: authURL,
    });
  },
  delete: function (id) {
    return ApiClient.delete(`/api/users/${id}`, {
      baseURL: authURL,
    });
  },
  getAll: function () {
    return ApiClient.get("/api/users", {
      baseURL: authURL,
    });
  },
};

export default StaffClient;
