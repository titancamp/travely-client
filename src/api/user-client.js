import ApiClient from "./api";
import appConfig from "../app-config.json";

const UserClient = {
  get: function (id) {
    return ApiClient.get(`/api/users/${id}`, {
      baseURL: appConfig.authURL,
    });
  },
  getAll: function () {
    return ApiClient.get(`/api/users`, {
      baseURL: appConfig.authURL,
    });
  },
  getCurrentUser: function () {
    return ApiClient.get(`/api/users/current`, {
      baseURL: appConfig.authURL,
    });
  },
};

export default UserClient;
