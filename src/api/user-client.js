import ApiClient from "./api";
import appConfig from "../app-config.json";

const authURL = process.env.REACT_APP_AUTH_URL || appConfig.authURL;

const UserClient = {
  get: function (id) {
    return ApiClient.get(`/api/users/${id}`, {
      baseURL: authURL,
    });
  },
  getAll: function () {
    return ApiClient.get(`/api/users`, {
      baseURL: authURL,
    });
  },
  getCurrentUser: function () {
    return ApiClient.get(`/api/users/current`, {
      baseURL: authURL,
    });
  },
};

export default UserClient;
